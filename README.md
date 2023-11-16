
![noai](https://www.jmvc.org/img/HumanCoded.png?raw=true)
![unicodeist](src/img/comparison/unicodeistLogo.png?raw=true)




A unicode characters based visual editor
---

Sometimes creating temporary creative for a logo should be a matter of minutes, using _unicodeist_ it is!

I created the following in more or less 3 minutes, using 3 different symbols.  

<img width="322"  src="src/img/comparison/fg.png?raw=true">  


Clicking <a href="./src/img/comparison/fg.json?raw=true" download>here</a> you could download exactly that creative and import it in _unicodeist_ (the _100% HUMAN CODED_ badge is <a href="./src/img/comparison/HumanCoded.json?raw=true" download>another example</a>).... but I'm sure You can do way better than that.   

One thing to notice here is that most of the times the size comparison is quite relevant:


| example    | .jpeg | .png | .json | embed html | embed script |
| -------- | ------- | ------- | ------- | ------- | ------- |
| [<img src="src/img/comparison/fg.png" width="50"/>](image)<br/>500x350  | 160 KB | 44 KB | 641 B  | 1.1 KB | 724 B |
| [<img src="src/img/comparison/fg.png" width="50"/>](image)<br/>1000x700  | 373 KB | 136 KB | 640 B  | 994 B | 723 B |
| [<img src="src/img/comparison/unicodeist.png" width="50"/>](image)<br/>500 x 250 | 63 KB | 40 KB | 1.4 KB | 2.4 KB | 1.5KB |
| [<img src="src/img/comparison/unicodeist.png" width="50"/>](image)<br/>1006 x 503 | 141 KB | 87 KB | 6 KB | 2.4 KB | 1.5KB |
| [<img src="src/img/comparison/HumanCoded.png" width="50"/>](image) | 10 KB | 3 KB | 2 KB | 3.8KB | 2.2 KB |

Seems clear (and quite obvious also the reason) that whenever few elements can potentially compose the creative then the benefits of using one of the _unicodeist_ embedding options grow proportionally to the image size, cause the exported image can only grow while the embedding html or script remains unchanged.

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
    - toggle full screen  
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
    - select the symbol for one of the bulk actions (see below, this checkbox is visible only when more than one symbol is added)
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
        - open an additional styles editor  
        - swap the symbol into a different one
            
    - change the `font-family`  
    - toggle italic style  
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

### Bulk actions 
<img align="right" width="250"  src="src/img/ss7.png?raw=true">  

When more than one symbol is added, then you will see a checkbox (for both expanded and collapsed ones). Then when more than one symbol is selected an additional speed dial menu will appear allowing to:  

1) trash the selected symbols  
2) equally space them horizontally (when min. 3 symbols selection)  
3) equally space them vertically (min. 3 symbols also here)  
4) align the vertically  
5) align the horizontally  

**2** and **3** use as boundaries the most left/top one and the most right/bottom one;  
**4** and **5** align on the mean vertical/horizontal position.

### Move | scale all symbols  
To move all _symbols_ together just go to the _unicodeist_ logo in the right upper part and drag within the logo, on mouse release all symbols will move together in that direction for an amout proportional to the movement.  
If you do the same with the `shift` key down then all symbols will be up or down scaled depending on the movement direction. Notice that the relative position of all the elements will **not** change.  
When some symbols are selected then only those will be moved or scaled.



---
༺ ᚗᚌ ༻