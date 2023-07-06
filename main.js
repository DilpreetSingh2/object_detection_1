img = "";
status = "";
objects = [];

function preload(){
img = loadImage('dog_cat.jpg');
}
function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);

document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded!!");
    status = true;
    objectDetector.detect(video, gotResult);
    
}

function gotResult(error, result){
if(error){
    console.log(error);

}
console.log(result);

objects = result;
}

function draw(){
image(video,0,0,380,380);

if(status != ""){
for(i = 0; i < objects.length;i++)
{
    document.getElementById("status").innerHTML = "status: object Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ objects.length;

    fill("red");
    percent = floor(objects[i].confidence*100)
stroke("red");
noFill();
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


}
}

}