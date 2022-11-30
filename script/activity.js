const 활동 = {
    에너지탐색: function(생물종) {
        생태계[생물종].배열.forEach(개체=>{
            const 개체특성 = 개체.특성;
            const 감지범위 = 계산.반지름계산(개체특성.반지름) + (개체특성.감각 * 특성관리.감각능률);

            const 최단거리포식자 = 계산.개체와_생물종_거리(개체, 생태계[생물종].포식생물종배열);
            const 최단거리피식자 = 계산.개체와_생물종_거리(개체, 생태계[생물종].피식생물종배열);

            if (최단거리포식자.거리 < 감지범위) {
                개체.위치.방향 = 계산.두점사이각도(개체, 최단거리포식자) + Math.PI;
            } else if (최단거리피식자.거리 < 감지범위) {
                개체.위치.방향 = 계산.두점사이각도(개체, 최단거리피식자);
            } else {
                개체.위치.방향 += (개체특성.회전속도 * Math.PI / 180) * 개체.회전방향;
                개체.남은회전 -= 개체특성.회전속도;
                if (개체.남은회전 < 0) {
                    개체.남은회전 = (Math.floor(Math.random() * (개체특성.최대회전 - 개체특성.최소회전 + 1)) + 개체특성.최소회전) * 10;
                    개체.회전방향 *= -1;
                }
            }

            const 개체위치 = 개체.위치;
            const x이동 = 개체위치.x + Math.cos(개체위치.방향) * 개체특성.속도 * 특성관리.이동능률;
            if      (화면크기 < x이동) {개체위치.x = 화면크기}
            else if (x이동 < 0)       {개체위치.x = 0}
            else                      {개체위치.x = x이동}

            const y이동 = 개체위치.y + Math.sin(개체위치.방향) * 개체특성.속도 * 특성관리.이동능률;
            if      (화면크기 < y이동) {개체위치.y = 화면크기}
            else if (y이동 < 0)       {개체위치.y = 0}
            else                      {개체위치.y = y이동}
            개체.에너지 -= (개체특성.속도**2 + 개체특성.감각) * 특성관리.에너지소모;
        });
    },
    에너지획득: function(생물종) {
        생태계[생물종].배열.forEach(개체=>{
            생태계[생물종].피식생물종배열.forEach(피식생물종=>{
                생태계[피식생물종].배열.forEach((피식자, index)=>{
                    if (계산.두점사이거리(개체, 피식자) < (계산.반지름계산(개체.특성.반지름) + 계산.반지름계산(피식자.특성.반지름))) {
                        개체.에너지 += 특성관리.획득에너지;
                        생태계[피식생물종].배열.splice(index, 1);
                    }
                });
            });
        });
    },
    에너지관리: function(생물종) {
        생태계[생물종].배열.forEach((개체, index)=>{
            if (개체.에너지 >= (개체.특성.유지에너지 * 10) + (개체.특성.전달에너지 * 10)) {
                특성관리.동물생성(생물종, 개체.특성, 개체.위치);
                개체.에너지 -= 개체.특성.전달에너지 * 10;
            }
            if (0 >= 개체.에너지) {
                생태계[생물종].배열.splice(index, 1);
            }
        });
    },
    기록: function(생물종) {
        if (!(생태계.시간 % 30)) {
            생태계[생물종].특성기록.push({
                개체수: 생태계[생물종].배열.length,
                ...계산.생물종특성평균(생물종)
            });
        }
    },
    활동함수배열: ['에너지탐색', '에너지획득', '에너지관리', '기록'],
    계산: function() {
        this.활동함수배열.forEach(작동할함수=>{
            생태계.동물.forEach(생물종=>{
                this[작동할함수](생물종);
            });
        });
    },
}