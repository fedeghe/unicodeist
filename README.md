
![noai](https://www.jmvc.org/img/HumanCoded.png?raw=true)
![unicodeist](src/img/unicodeist.png?raw=true)




A unicode characters based visual editor
---

Sometimes creating temporary creative for a logo should be a matter of minutes, using _unicodeist_ it is!

I created the following in more or less 3 minutes, using 3 different symbols.  

<img width="322"  src="src/img/fg.png?raw=true">  


Clicking <a href="./src/img/fg.json?raw=true" download>here</a> you could download exactly that creative and import it in _unicodeist_ (the _100% HUMAN CODED_ badge is <a href="./src/img/HumanCoded.json?raw=true" download>another example</a>).... but I'm sure You can do way better than that.   

One thing to notice here is that most of the times the size comparison is quite relevant:
| example    | png | unicounicodeist (json) |
| -------- | ------- | ------- |
| [<img src="src/img/fg.png" width="50"/>](image.png)  | <strong style="color:red">44 KB</strong>    | <strong style="color:green">641 B</strong>    |
| [<img src="src/img/unicodeist.png" width="50"/>](image.png) | <strong style="color:red">87 KB</strong>     | <strong style="color:green">6 KB</strong>    |
| [<img src="src/img/HumanCoded.png" width="50"/>](image.png) | <strong style="color:red">3 KB</strong>     | <strong style="color:green">2 KB</strong>    |

... aaaand ... yes I have definitely a bold palette preference!   


### [༺ TRY IT HERE ༻](https://fedeghe.github.io/unicodeist/)

---
- In the top right you can:<img align="right" width="322"  src="src/img/ss1.png?raw=true">

    - start a new creative 
    - change the `background-color` (default is white)
    - toggle background transparency
    - open the background styles editor
    - open the keyFrames editor
    - toggle navigation blocker
    - switch 🌓 theme
    - set the size of the current _creative_
    - hover the speed dial button to:
        - contribute to the project 
         - get the content as `<div>` usable in a html page or a `<script>` that will automatically render the _creative_ exactly where you put the script.
        - export either:
            1) `.json` file of the current _creative_ (afterward importable)
            2) `.png` or `.jpeg` of the current _creative_
        - import one of the exported `.json` files
        
    ---

- Press the ➕ button on the **top** **left** (or if fullscreen is not active press `ESC` button) to toggle the symbol selection panel  

- Add one or more symbols and close the panel (through ➖ button or pressing `ESC`, again the latter only if u are not in fullscreen mode)  

<img align="right" width="250"  src="src/img/ss2.png?raw=true">  

- Last symbol added is the current target one, thus on the right panel you will see a tuning card expanded allowing you to:  
    - set a label for it (only useful to search it among added symbols)
    - set the `z-index`
    - see a preview showing on its left some icons to:
        - thrash it 
        - isolate that from others (useful to be sure to change the right _symbol_)
        - clone it (when clicked, the clone will be found on the symbol list bottom)
        - bring it to the top (`z-index`)
        - move it to the bottom (`z-index`)
        - center it horizontally ...almost  
        - center it vertically ...almost  
            
    - change the `font-family`  
    - change the `font-weight`
    - change the `color`
    - tune `scale`, `scaleX`, `scaleY`, `rotationX`, `rotationY`, `rotationZ`, `skewX`, `skewY`, `blur` and `opacity`
    - move to a different location:  
        - using the range inputs
        - drag the symbol
        - when focused press `⇧ + arrow` (1px move each)
    - apply one of the `keyFrames` listed (or imported) in the keyFrames editor


<img align="right" width="250"  src="src/img/ss3.png?raw=true">  

all range fields can be tuned either moving the range handle either just clicking on the value and scroll `up/down` or just type the exact value and blur or hit `enter` buttons (if a range is focused then the scrolling on the symbols list is disabled).



### Move | scale all symbols  
To move all _symbols_ together just go to the _unicodeist_ logo in the right upper part and drag within the logo, on mouse release all symbols will move together in that direction for an amout proportional to the movement.  
If you do the same with the `shift` key down then all symbols will be up or down scaled depending on the movement direction. Notice that the relative position of all the elements will **not** change.



---
༺ ᚗᚌ ༻