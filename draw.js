let WIDTH = 800;
let HEIGHT =800;
const ControlItems = [
    {id:"pen",name:'铅笔'},
    {id:'line',name:'直线'},
    {id:'rect',name:'矩形'},
    {id:'arc',name:'圆形'},
    {id:'robber',name:'橡皮擦'},
    {id:'img',name:'图片'},
    {id:'save',name:'保存'},
    {id:'file',name:'文件'},
    {id:'color',name:'颜色'},
    {id:'lineWidth',name:'线宽'},
];

class DrawingPenal{
    constructor(id){
        this.canvas = document.getElementById(id).getContext('2d');
        this.round = []
        this.animate()
    }

    animate(){
        console.log(this.animate);
        this.canvas.clearRect(0,0,WIDTH, HEIGHT);
        for (let j in this.round){
            round[i].draw();
        }
        requestAnimationFrame(this.animate.bind(this))
    }
}

class ControlPenal{
    constructor(){
        this.state = '铅笔';
        this.items = [];
    }
    getState() {
        return this.state;
    }
    setState(state) {
        if (this.state !== state){
            this.notifyAllObservers();
        }
    }
    notifyAllObservers() {
        this.items.forEach(item => {
            item.update();
        })
        console.log(this)
    }
    attach(observer){
        this.items.push(observer)
    }
}

class ControlItem{
    constructor(name, type, node, penal, isSelect){
        this.penal = penal;
        this.isSelect = isSelect;
        this.name = name;
        this.type = type;
        this.node = node;
        this.changeState();
        this.penal.attach(this)
    }
    changeState(){
        let that = this;
        this.node.addEventListener('click', () => {
            that.penal.setState(that.name)
        })
    }
    update(){
        this.isSelect = this.penal.status === this.name;
    }
}

function creatControlItem(nodeInfo, penal) {
    let isSelect = nodeInfo.name === '铅笔';
    let node = document.getElementById(nodeInfo.id);
    let type = nodeInfo.type || 1;
    return new ControlItem(nodeInfo.name, type, node, penal, isSelect)
}

function init() {
    const controls = new ControlPenal();
    const drawCanvas = new DrawingPenal('penal');
    ControlItems.forEach(value => {
        controls.items.push(creatControlItem(value, controls))
    });
}

init();