const ctx = document.getElementById('캔버스').getContext("2d");
const 화면크기 = document.getElementById('캔버스').height;
const 화면 = { // 미완성
    상태그래프: {
        허가: false,
        불투명도: 1,
    },
    변화그래프: {
        허가: false,
        범위: 0,
        기준: 0,
        불투명도: 1,
    },
    생물불투명도: 1,
    상태그래프출력: function() {
        특성관리.배열.forEach(특성요소=>{
            const 특성정보 = 특성관리.정보[특성요소];
            생태계[생물종].특성분포[특성요소] = new Array(특성정보.최대 + 1).fill(0, 특성정보.최소, 특성정보.최대 + 1);
            생태계[생물종].배열.forEach(개체=>{
                생태계[생물종].특성분포[특성요소][개체.특성[특성요소]]++
            });
        });
    },
    변화그래프출력: function() { // 출력범위는 (기준 - 범위) ~ (기준)
        
    },
    생물출력: function() {
        ['식물'].concat(생태계.동물).forEach(생물종=>{
            생태계[생물종].배열.forEach(개체=>{
                ctx.beginPath();
                ctx.arc(개체.위치.x, 개체.위치.y, 계산.반지름계산(개체.특성.반지름), 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = `rgb(${생태계[생물종].색상}, ${this.생물불투명도})`;
                ctx.fill();
            });
        });
    },
    개체수출력HTML생성: function(생물종, 색상) {
        const 생물종HTML = document.createElement('div');
        생물종HTML.setAttribute('id', 생물종);
        생물종HTML.textContent = '개체수: ';

        const 생물종이름 = document.createElement('span');
        생물종이름.style.color = `rgb(${색상})`;
        생물종이름.textContent = 생물종;
        
        const 생물종변수 = document.createElement('span');
        생물종변수.setAttribute('id', `${생물종}개체수`);

        document.getElementById('개체수출력').appendChild(생물종HTML);
        document.getElementById(생물종).prepend(생물종이름);
        document.getElementById(생물종).append(생물종변수);
    },
    개체수출력: function() {
        document.getElementById("총합개체수").textContent = 생태계.동물.reduce((acc, 생물종) => {
            const 개체수 = 생태계[생물종].배열.length;
            document.getElementById(`${생물종}개체수`).textContent = 개체수;
            return acc + 개체수;
        }, 0);
    },
    출력: function() {
        ctx.clearRect(0, 0, 화면크기, 화면크기);
        // this.상태그래프출력();
        this.생물출력();
        // this.변화그래프출력();
        this.개체수출력();
    },
    출력애니매이션: null, 애니매이션작동: false,
    애니매이션간격: 1000 / 60, 이전작동시간: 0,
    애니매이션: function(시간원점이후경과시간) {
        const 이전작동이후경과 = 시간원점이후경과시간 - 화면.이전작동시간;
        if (이전작동이후경과 >= 화면.애니매이션간격) {
            화면.이전작동시간 = 시간원점이후경과시간 - (이전작동이후경과 % 화면.애니매이션간격);
            계산.종합();
            화면.출력();
        }
        화면.출력애니매이션 = requestAnimationFrame(화면.애니매이션);
    },
    크기재설정: function() {
        document.getElementById('캔버스').style.width = window.innerHeight+ 'px';
        document.getElementById('캔버스').style.height = window.innerHeight+ 'px';
    },
}