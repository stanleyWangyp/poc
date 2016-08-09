
// 基于准备好的dom，初始化echarts图表
var myChart = echarts.init(document.getElementById('main'));
option = {
    title : {
        text: '7-Jul-2016',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color:['blue', 'yellow','green','red'],

    legend: {
        orient: 'vertical',
        left: 'right',
        data: ['completed','processing','pending','failed'],

    },
    series : [
        {
            name: 'Relative Size ',
            type: 'pie',
            radius : '55%',
            right: ['80%', '60%'],
            data:[
                {value:335, name:'completed'},
                {value:310, name:'processing'},
                {value:234, name:'pending'},
                {value:100, name:'failed'}

            ],
            itemStyle: {semphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
            }
        }
    ]
};
/*
 <script language=''javascript''>
 var flag ='true';
 window.location.reload(flag);
 myChart.setOption(option);
 flag='false';


 </script>
 function myrefresh(){
 var flag ='true';
 window.location.reload(flag);
 }

 myChart.setOption(option);
 flag = 'flag';
 */
$(function () {
    // 为echarts对象加载数据

    myChart.setOption(option);
})