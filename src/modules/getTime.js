// export文を使ってGetTimeを定義。
export default class GetTime {
  constructor() {
    this.now = new Date();
    this.hour = this.now.getHours();
    this.min = this.now.getMinutes();
    this.sec = this.now.getSeconds();
  }

  // 現在時刻を表示
  show() {
    alert(`${this.hour}時${this.min}分${this.sec}秒`);
  }
}
