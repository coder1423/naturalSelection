const 계산 = {
    두점사이거리: function(점1, 점2) {
        return ((점2.위치.x - 점1.위치.x)**2 + (점2.위치.y - 점1.위치.y)**2)**0.5;
    },
    두점사이각도: function(점1, 점2) {
        return Math.atan2(점2.위치.y - 점1.위치.y, 점2.위치.x - 점1.위치.x);
    },
    랜덤위치: function() {
        return {
            방향 : Math.random() * (Math.PI * 2),
            x : Math.floor(Math.random() * 화면크기),
            y : Math.floor(Math.random() * 화면크기),
        };
    },
    개체와_생물종_거리: function(대상개체, 생물종배열) {
        let 최단거리개체 = {x: null, y: null, 거리: Infinity};
        생물종배열.forEach(생물종=>{
            생태계[생물종].배열.forEach(비교개체=>{
                const 개체사이거리 = 계산.두점사이거리(대상개체, 비교개체);
                if (개체사이거리 < 최단거리개체.거리) {
                    최단거리개체 = {위치: {x: 비교개체.위치.x, y: 비교개체.위치.y}, 거리: 개체사이거리}
                }
            });
        });
        return 최단거리개체;
    },
    특성반환: function(입력특성) {
        const 출력특성 = {};
        특성관리.배열.forEach(특성=>{
            출력특성[특성] = Math.round(입력특성[특성]);
        });
        return 출력특성;
    },
    반지름계산: function(특성반지름) {
        return 특성관리.기본반지름 + (특성반지름 * 특성관리.반지름특성배율);
    },
    생물종특성평균: function(생물종) {
        const 생물종배열 = 생태계[생물종].배열;
        const 특성 = {};
        특성관리.배열.forEach(특성요소=>{
            특성[특성요소] = (생물종배열.reduce((acc, 개체) => acc + 개체.특성[특성요소], 0) / 생물종배열.length).toFixed(3);
        });
        return 특성;
    },
    종합: function() {
        생태계.시간++;
        생태계.식물.생성관리();
        활동.계산();
    },
}