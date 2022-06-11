song = "";
song2 = "";

song_status = "";
song2_status = "";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;


function setup(){
    canvas = createCanvas(600 , 500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('poses' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet initialised !")
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;

    console.log("Score Right Wrist =" + scoreRightWrist+ ",Score Left Wrist ="+scoreLeftWrist);


    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist X ="+rightWristX+", right wrist y = "+rightWristY);

leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
console.log("left wrist X ="+leftWristX+", left wrist y = "+leftWristY);

}
}

function draw()
{
    image(video, 0, 0, 600, 500);
    song_status = song.isPlaying();
song2_status = song2.isPlaying();
    fill("#FF0000")
    stroke("#FF0000")
if(scoreRightWrist > 0.2)
{
    song2.stop();
    circle(rightWristX, rightWristY, 20);

    if(song_status == false)
    {
        document.getElementById("song").innerHTML = "Playing - Harry Potter theme song ";
        song.play();
    }
   
}
if(scoreLeftWrist > 0.2){
    song.stop();
    circle(leftWristX, leftWristY, 20);
    if(song2_status == false){
        song2.play()
        document.getElementById("song").innerHTML = "Playing - Peter Pan song"

    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}