const 생태계 = {
    개체: class{
        constructor(특성, 위치) {
            this.특성 = 계산.특성반환(특성);

            this.위치.방향 = 위치.방향;
            this.위치.x = 위치.x;
            this.위치.y = 위치.y;

            this.에너지 = this.특성.전달에너지 * 10;
        }
        위치 = {};
        남은회전 = 0;
        회전방향 = 1;
    },
    생물종: class{
        constructor(색상) {
            this.색상 = 색상;
        }
        피식생물종배열 = [];
        포식생물종배열 = [];
        배열 = [];
        특성기록 = [];
        특성분포 = {};
        특성강제 = {
            감각: null, 속도: null, 변이: null,
            반지름: 10,
            유지에너지: 10, 전달에너지: 10,
            회전속도: 5, 최소회전: 3, 최대회전: 9,
        };
    },
    식물: {
        색상: '0, 255, 0',
        초당생성: 0,
        이전생성: 0,
        이전변경: 0,
        생성수변화: {목표: 0, 크기: 0,},
        배열: [],
        생성관리: function() {
            while ((생태계.시간 - this.이전생성) >= 60 / this.초당생성) {
                this.이전생성 += 60 / this.초당생성;
                특성관리.식물생성();
            }
            if (this.생성수변화.목표 !== this.초당생성) {
                while ((생태계.시간 - this.이전변경) >= 60 / this.생성수변화.크기) {
                    this.이전변경 += 60 / this.생성수변화.크기;
                    if (this.초당생성 < this.생성수변화.목표) {
                        this.초당생성 += 1;
                    } else {
                        this.초당생성 -= 1;
                    }
                }
            }
        }
    },
    동물: [],
    시간: 0,
    먹이그물계산: function() {
        생태계.동물.forEach(생물종=>{
            생태계[생물종].피식생물종배열 = 생태계[생물종].피식생물종배열.filter(피식생물종=> 피식생물종 == '식물' || 생태계.동물.includes(피식생물종));
            생태계[생물종].포식생물종배열 = 생태계.동물.filter(다른생물종=> 생태계[다른생물종].피식생물종배열.includes(생물종));
        });
    },
}

화면.크기재설정();
window.addEventListener("resize", ()=>{화면.크기재설정()});