import BaseCanvas from "./BaseCanvas"
import MigrationLine from "./../shape/MigrationLine"

const   constoptions={
    map: {},
    data: {},
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcWidth: 1,
    arcLabel: true,
    arcLabelFont: '15px sans-serif',
    Marker: {},
    Spark: {}

};

class GLCanvasMigrateLines extends BaseCanvas{
    constructor(){
        super();
        this.options=constoptions;
        this._style = {
                pulse: {
                    radius: this.options.pulseRadius,
                    borderWidth: this.options.pulseBorderWidth
                },
                arc: {
                    width: this.options.arcWidth,
                    label: this.options.arcLabel,
                    font: this.options.arcLabelFont
                }
            } || {};
    }

    draw(context, dataSet, options,renderer) {
        var data = dataSet.get();
        // var context=canvas.getContext("2d");
        this._style.pulse.radius=options.radius|| this._style.pulse.radius
        this._style.pulse.lineWidth=options.lineWidth||this._style.pulse.borderWidth
        this._style.arc.font=options.font||this._style.arc.font;
        this._style.arc.width=options.lineWidth||this._style.arc.width
        var _data=[];
        var devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            var xy=obj.xy;
            var from=xy[0],to=xy[xy.length-1];
            from=[from[0]*devicePixelRatio,from[1]*devicePixelRatio];
            to=[to[0]*devicePixelRatio,to[1]*devicePixelRatio];
            _data.push({
                from:from,
                to:to,
                labels:obj.labels,
                width:options.lineWidth||5,
                size:options.size||5,
                color:obj.color||obj.fillStyle||obj.strokeStyle||options.strokeStyle||options.fillStyle||'#F9000C'
            })
        }

        if(!this.migration){
            this.migration=new MigrationLine({
                data: _data,
                context: context,
                style: this._style,
                speed:options.speed,
                renderer:renderer,
                lineWidth:options.lineWidth,
                arrowSize:options.arrowSize
            });
        }else{
            this.migration.updateData(_data);
        }
        if(!this.migration.started)
           this.migration.start(context.canvas);

    }
}

export default GLCanvasMigrateLines
