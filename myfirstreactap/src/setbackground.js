import React, {useState} from 'react';
// import the default export and the named export `useState` from the 'react' library


export default function ColorPicker() {
  const [color, setColor] = useState();
  // Mình assume là chỉ cần delare nó như thế này thôi là xài globally được rồi, không cần delare cho mỗi lần xài riêng biệt
 
 const divStyle = {backgroundColor: color};
 //Cái backgroundColor nó đã ơ trong ngoặc rồi nên không dùng {color} mà dùng color thôi là được rồi
  return (
    <div style={divStyle}>
      <p>The color is {color}</p>
      <button onClick={() => setColor("Aquamarine")}>Aquamarine</button>
      <button onClick={() => setColor("BlueViolet")}>BlueViolet</button>
      <button onClick={() => setColor("Chartreuse")}>Chartreuse</button>
      <button onClick={() => setColor("CornflowerBlue")}>CornflowerBlue</button>
    </div>
  );
}
