import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';
import { cube } from './math.js';

function component() {
  // var element = document.createElement('div');
  // var btn = document.createElement('button');
  var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
      ].join('\n\n');

  // // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');
  // // 将图像添加到我们现有的 div。
  // var myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;

  // element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}