// router.js
import { createBrowserRouter } from "react-router-dom";
import routes from '../routes/index';  // routes에서 개별 경로를 가져옴

// 여기서 routes를 사용해 전체 라우터를 생성
const router = createBrowserRouter(routes);

export default router;
