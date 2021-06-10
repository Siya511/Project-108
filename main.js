prediction = "";

Webcam.set({
    width: 350,
    hieght: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
    })
}

console.log("ml5.version: ",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j0xmkiYYv/model.json',modelLoded);

function modelLoded()
{
    console.log("Model Loded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_1 = "Theprediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_1);
    synth.speak(utterThis);
}


function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result)
{
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("gesture_name").innerHTML = result[0].label;
        prediction = result[0].label;
        speak();

        if (result[0].label == "best")
        {
            document.getElementById("emoji1").innerHTML = "&#128077;";
        }
        if (result[0].label == "amazing")
        {
            document.getElementById("emoji1").innerHTML = "&#128076;";
        }
        if (result[0].label == "victory")
        {
            document.getElementById("emoji1").innerHTML = "&#128406;";
        }

    }
}