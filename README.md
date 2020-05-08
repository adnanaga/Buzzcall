# BuzzCall

Introducing Buzzcall! - Prerecord your messages and play them back when you get asked a question

Are you tired of boring meetings?

Do you wish you hadn't joined this family meeting so you wouldn't have to hear your uncle gunther talk?

Are you sick of hearing karen go through budget reports and asking if you heard her!

Put this in your zoom or hangouts call and have fun! Play with your dog, do a puzzle, watch some tv and only tune in when you have to with Buzzcall

## Get Set up

### OBS Prequisites
1. Follow the instructions [here](https://github.com/johnboiles/obs-mac-virtualcam) on setting up OBS and a virtual cam for Mac.
2. Download the OBS Websocket Plugin 
    1. ```git clone --recursive https://github.com/Palakis/obs-websocket.git```
    2. ```cd obs-websocket```
    3. ```./CI/install-dependencies-macos.sh```
    4. ```./CI/install-build-obs-macos.sh```
    5. You'll end up wth a obs-websocket.so file
3. Copy this to your OBS Studio plugin folder at `$OBS_DIR/build/rundir/RelWithDebInfo/obs-plugins/`

### Figure out what you want to respond to 🤔
- Think of commonly asked questions during calls or meetings
    - “Hey are you still there”
    - “Your connections’ breaking up”
    - “What do you think”
    - “Do you agree ?”
- Think of your responses to them
    - "Yep I'm still here, keep going"
    - "I'm cool with it, maybe slack me the details afterwards"

### Record some clips!
1. Head over to Quicktime Player
2. Click FIle > New Movie Recording
3. Record a clip of yourself just looking at the screen. Make it look like youre paying attention.
4. Save your file as Background.mov
5. Repeat Steps 2 and 3 with the responses you thought of earlier!

### Some OBS Setup
1. Launch your built version of OBS with the instructions above
2. Add a Scene and name it "Background"
3. Select media source
Click the + symbol under the 'Sources' section. You should see the 'media source' option, click on that.
4. Name the layer "bg"
5. Browse and select the background video file.
    - Once selected, ensure you check the 'loop' option. (We're looping our background so no ones the wiser)
6. Add in your other responses with different scenes but dont check the loop button. We only want those to play once.

![Scene Image](/images/scene.png)

###  Prep the code
In index.html under the Artyom add commands function is where the speech recognition and response magic happens. 
1. Add your queries to the array, this is what Artyom will try to listen for
2. Once it hears one of those queries, it will then send a websocket message to OBS to play a particular scene
3. It then tells OBS to switch back to the Background scene after an amount of time. Ideally this length matches the duration of the video

```
{
    //Query for Artyom to listen for
    indexes: [
        'Adnan are you there',
        'are you there',
        'are you connected',
        'can you hear me',
        'are you still there'
        ],
        
    // WHat scene should it play
    action: (i) => {
        console.log(`Playing Offline`);
        obs.send('SetCurrentScene', {
            'scene-name': 'Offline'
        });

        // How long before it goes back to the background
        setTimeout(() => {
            obs.send('SetCurrentScene', {
                'scene-name': 'Background'
            });
        }, 8000)
    }
}, 
```
4. Go into Terminal and navigate to this directory
5. Install the node modules with
    ```
    npm install
    ```

## The big moment
1. Head on over to OBS and click Tools > Start Virtual Camera 
2. Open up Google Chrome and then change your camera source to OBS
    - Sometimes if OBS doesn't show up as a camera source you might have to restart Chrome
4. Call someone on Hangouts or Chrome
5. Turn your Volume Up
6. Start the program with
    ```
    node app.js
    ```
7. Click Start Recognition
8. Go Play Animal Crossing

![Chat Image](/images/chat.jpeg)

## Notes

* These instructions are Mac only but I'm sure the logic here could be applied to Windows and Linux too!
* Also uses node to serve the webpage!
* The system uses https so it can record and listen continuously, so be sure to generate your Keys and Cerificates

## Built With

[Artyom JS](https://sdkcarlos.github.io/sites/artyom.html) - HTML5 Voice Control
OBS - Controlling the Feed

## Authors

Adnan Aga

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Huge shoutout to Matt Reed for the [original concept](https://github.com/mcreed/zoombot)
