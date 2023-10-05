import React, { useEffect, useRef } from 'react';
import styles from "./Canvas.module.css";

function CanvasComponent() {
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const cursor = useRef(0);

  const rowHeight = useRef(50);
  const rowWidth = useRef(400);
  const elementWidth = useRef([]);

  // 点击canvas让textarea获得焦点开始输入
  const handleClick = () => {
    // 在组件获得焦点时触发的处理函数
    console.log('Component is focused');
    textareaRef.current.focus()
  };

  const handleInput= e => {
    e.preventDefault();
    console.log(e.target.value);
    const ctx = canvasRef.current.getContext('2d');

    ctx.font = "50px serif";
    const textMetrics = ctx.measureText(e.target.value); // 获取文本的测量信息
    const textWidth = textMetrics.width; // 获取文本的实际宽度
    const metrics = ctx.measureText(e.target.value); // 选择一个高度最大的字母以获得文本的高度
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log(`文本 "${e.target.value}" 的实际宽度为 ${textWidth} 像素，高度${textHeight}`);
    
    ctx.fillText(e.target.value, cursor.current, 50);

    elementWidth.current.push(textWidth);

    cursor.current += textWidth;

    console.log(cursor.current);

    textareaRef.current.value = ''

  };

  const handleKeyDown = e=>{
    if(e.keyCode === 46 || e.keyCode === 8){
      const ctx = canvasRef.current.getContext('2d');
      let lastElWidth = elementWidth.current.pop();
      cursor.current -= lastElWidth;
      // ctx.fillStyle = 'blue';
      // ctx.fillRect(cursor.current, 0, lastElWidth, 50);
      ctx.clearRect(cursor.current, 0, lastElWidth, 100);
      console.log(e.keyCode,cursor.current);
    }
  }

  useEffect(() => {
    // // 在组件挂载后执行的代码
    // const canvas = canvasRef.current; // 获取canvas元素
    // const ctx = canvas.getContext('2d');

    // // 在canvas上绘制矩形
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(50, 50, 100, 100);

    // 在这里可以执行其他副作用操作
    console.log(window.devicePixelRatio );

    // 清理操作可以放在返回的函数中
    return () => {
      // 在组件卸载时执行的清理操作
      // 可选的，视具体需求而定
    };
  }, []); // 空数组表示仅在组件挂载和卸载时执行

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={400} height={400} className={styles.canvas} onClick={handleClick}></canvas>
      <textarea ref={textareaRef} className={styles.textarea} onInput={handleInput} onKeyDown={handleKeyDown}></textarea>
    </div>
  )
}

export default CanvasComponent;