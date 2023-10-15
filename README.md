
![Unicodeist](src/img/unicodeist.png?raw=true)




A unicode characters based visual editor
---

Sometimes creating temporary creative for a logo should be a matter of minutes, using _unicodeist_ is it!

I created the following in more or less 3 minutes, using 3 different symbols...  

<img width="322"  src="src/img/ss0.png?raw=true">

Clicking <a href="./src/img/fg.json?raw=true" download>here</a> you could download exactly that creative and import it in _unicodeist_ .... but I'm sure You can do way better that that 


[Try it here](https://fedeghe.github.io/Unicodeist/)

---
- In the top right you can:<img align="right" width="322"  src="src/img/ss1.png?raw=true">
    - set the size of the current _creative_
    - switch 🌓 theme
    - export a `.json` file of the current _creative_
    - import one of the exported `.json` files
    - change the `background-color` (default is white)
    - email the html of the _creative_ to someone
    - get the content as `<div>` usable in a html page or a `<script>` that will automatically render it exactly where you put the script.
    - export a named file as png|jpeg|blob|pixeldata|svg
    ---

- Press the ➕ button on the top left (or press `ESC` button) to toggle the symbol selection panel  

- Add one or more symbols and close the panel (through ➖ button or pressing `ESC`)  

<img align="right" width="322"  src="src/img/ss2.png?raw=true">  

- Last symbol added is the current target one, thus on the right panel you will see a tuning card expanded allowing you to:  
    - set a label for it (only useful to search it among added symbols)
    - set the `z-index`
    - see a preview showing on its left some icons to:
        - throw it away 
        - isolate that from others (useful to be sure to change the right symbol)
        - clone it  (when clicked, the clone will be automatically the target)
        - bring it to the top (z-index)
        - move it to the bottom (z-index)
        - center horizontally *
        - center vertically *  
            
    - change the `font-family` of the symbol  
    - change the `font-weight` of the symbol
    - change the `color` of the symbol
    - tune `scale`, `scaleX`, `rotationX`, `rotationY`, `scaleY`, `rotationZ`
    - move the symbol in a different location:  
        - using the range inputs
        - drag the symbol
        - when focused press <span style="padding:0px 2px;font-size:1.5em;position:relative;top:2px;border:1px solid gray">⇧ + arrow</span> (1px move each)



### Move all symbols  

To move all symbols together just go to the _Unicodeist_ logo in the right upper part and drag it in one direction, on drop end all symbols will move together in that direction for an amout proportional to the movement.


---
\(*) for the moment far from working as desired

