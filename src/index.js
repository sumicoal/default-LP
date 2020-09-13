import "core-js/stable";
import "regenerator-runtime/runtime";

// getTime.jsをインポート
import GetTime from './modules/getTime';
import './scss/index.scss';

// getTime.jsに定義された機能を実行。
const getTime = new GetTime();
getTime.show();
