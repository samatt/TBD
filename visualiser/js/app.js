function App(){
  this.params = new Params();
  var gui = new dat.GUI();
  var utilsGui = gui.addFolder("Utils");

  var f1 =  utilsGui.addFolder("Server")
  f1.add(this.params, 'dbName');
  f1.add(this.params, 'remoteServer');

  var f3 =  utilsGui.addFolder("Time")
  f3.add(this.params, 'hours', 0, 59).step(1);
  f3.add(this.params, 'minutes', 0, 59).step(1);
  f3.add(this.params, 'seconds', 0, 59).step(1);

  var graphGUI = new dat.GUI();
  var graphFolder =  graphGUI.addFolder("Graph");
  var layouts = graphFolder.add(this.params, 'layout', config.layouts);
  var refreshRate =  graphFolder.add(this.params, 'refreshRate', 0, 10);

  graphFolder.addFolder(config.layouts[0]);
  var currentLayout = config.layouts[0];

  this.wrapper = Pouch();
  this.wrapper(config.dbName, config.remoteServer);
  this.myNetwork = Network();
  time = setUTCDuration(this.params.hours,this.params.minutes,this.params.seconds);
  this.wrapper.queryByTime(this.myNetwork,time,true);

  params.intervalId = setInterval(myInterval,params.refreshRate * 1000);

  layouts.onChange(function(value) {

    //TODO: Make sure the handkers are being removed from the folders too
    if(currentLayout !== ""){graphFolder.removeFolder(currentLayout);}

    if(value == "Network"){

      var f3 =graphFolder.addFolder("Network");

      var test = f3.add(params.layoutParams,"linkRadiusMin",1,400).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:linkRadiusMin:" + value);});

      test = f3.add(params.layoutParams,"linkRadiusMax",1,400).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:linkRadiusMax:"+value);});

      test = f3.add(params.layoutParams,"routerRadius",1,20).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:routerRadius:"+value);});

      test =f3.add(params.layoutParams,"clientRadius",1,20).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:clientRadius:" + value);});

      test = f3.add(params.layoutParams,"friction",0,1);
      test.onChange(function(value){myNetwork.updateParams("none:friction:"+value);});

      test = f3.add(params.layoutParams,"charge",-700,500).step(1);
      test.onChange(function(value){myNetwork.updateParams("none:charge:"+value);});

      test = f3.addColor(params.layoutParams,"routerColor");
      test.onChange(function(value){myNetwork.updateParams("false:routerColor:"+ value);});

      test = f3.addColor(params.layoutParams,"clientColor");
      test.onChange(function(value){myNetwork.updateParams("false:clientColor:" + value);});

      test = f3.addColor(params.layoutParams,"linkColor");
      test.onChange(function(value){myNetwork.updateParams("false:linkColor:"+value);});
    }
    else if(value == "Distance"){

      var f3 = graphFolder.addFolder("Distance");

      var test = f3.add(params.layoutParams,"circleRadius",1,20).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:circleRadius:" + value);});

      test = f3.add(params.layoutParams,"linkRadiusMin",1,400).step(1);
      test.onFinishChange(function(value){ myNetwork.updateParams("true:linkRadiusMin:" + value);});

      test = f3.add(params.layoutParams,"linkRadiusMax",1,400).step(1);
      test.onFinishChange(function(value){myNetwork.updateParams("true:linkRadiusMax:" + value);});

      test = f3.addColor(params.layoutParams,"routerColor");
      test.onChange(function(value){myNetwork.updateParams("false:routerColor:"+ value);});

      test = f3.addColor(params.layoutParams,"clientColor");
      test.onChange(function(value){myNetwork.updateParams("false:clientColor:" + value);});

      test = f3.addColor(params.layoutParams,"linkColor");
      test.onChange(function(value){myNetwork.updateParams("false:linkColor:"+value);});

      test = f3.add(params.layoutParams,"friction",0,1);
      test.onChange(function(value){myNetwork.updateParams("none:friction:"+value);});

      test = f3.add(params.layoutParams,"charge",-700,500).step(1);
      test.onChange(function(value){myNetwork.updateParams("none:charge:"+value);});

      // f3.add(params.layoutParams,"circleRadiusRouter").step(1);
      // f3.add(params.layoutParams,"circleRadiusClient").step(1);
    }
    else{
      value = "";
    }
    currentLayout = value;
    myNetwork.toggleLayout(value);

  });

  refreshRate.onFinishChange(function(value){
    // console.log("clearing interval ID:" + params.intervalId);
    clearInterval(params.intervalId);
    params.intervalId = setInterval(myInterval,params.refreshRate * 1000);
    // console.log("setting interval ID:" + params.intervalId);
  });



  var myInterval = function(){
    console.log(params.hours+" : "+params.minutes+" : "+params.seconds)
    time = setUTCDuration(params.hours,params.minutes,params.seconds);
    wrapper.queryByTime(myNetwork,time,false);
  };


}

function Params() {

  this.dbName = "test";
  this.remoteServer  = 'http://127.0.0.1:5984/test';
  this.layout = []; //= [ 'ConnectionsRealTimes', 'Distance' , 'Connections' ];
  this.refreshRate = 10;
  this.hours = 0;
  this.minutes = 3;
  this.seconds = 0;
  this.intervalId;
  this.test = " s";
  this.layoutParams = {
    routerColor: colorbrewer.Set3[12][4],
    clientColor: colorbrewer.Set3[12][3],
    linkColor: colorbrewer.Blues[9][3],
    circleRadius: 4,
    linkRadiusMin: 4,
    linkRadiusMax: 30,
    routerRadius: 4,
    clientRadius: 8,
    friction: 0.8,
    charge: -150
    //FOR GUI:Color min, max
  }
};
