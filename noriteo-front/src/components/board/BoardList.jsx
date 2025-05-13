// // BoardList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../../components_css/BoardCSS/BoardList.css";
// import { useNavigate } from "react-router-dom";
// import ImageSlider from "../../index/board/CenterBar/ImageSlider.jsx"; // 추가

// const BoardList = ({ boardType, sortType }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);

//     axios
//       // .get("http://localhost:8080/api/board-with-image") // ✅ 백엔드 API
//       .get("http://localhost:8080/api/board/list")
//       .then((response) => {
//         let fetchedPosts = response.data;

//         if (boardType) {
//           fetchedPosts = fetchedPosts.filter(
//             (post) => post.board_type === boardType
//           );
//         }

//         if (sortType === "views") {
//           fetchedPosts.sort((a, b) => b.board_views - a.board_views);
//         } else if (sortType === "latest") {
//           fetchedPosts.sort(
//             (a, b) => new Date(b.board_regdate) - new Date(a.board_regdate)
//           );
//         }

//         setPosts(fetchedPosts);
//         setCurrentPage(1);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("게시글 불러오기 실패:", err);
//         setError("게시글을 불러오는 데 실패했습니다.");
//         setLoading(false);
//       });
//   }, [boardType, sortType]);

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(posts.length / postsPerPage);

//   if (loading) return <p>로딩 중...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       {/* ✅ 카드 슬라이더에 props로 전달 */}
//       <ImageSlider cards={posts.slice(0, 10)} /> {/* 최대 10개만 출력 */}
//       <div className="board-table-container">
//         <table className="board-table">
//           <thead>
//             <tr>
//               <th>게시판</th>
//               <th>제목</th>
//               <th>작성자</th>
//               <th>작성일</th>
//               <th>조회수</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPosts.length > 0 ? (
//               currentPosts.map((post) => (
//                 <tr
//                   key={post.board_id}
//                   onClick={() => navigate(`/post/${post.board_id}`)}
//                 >
//                   <td>{post.board_type}</td>
//                   {/* <td className="truncate-title" title={post.board_title}>
//                     {post.board_title.length > 40
//                       ? post.board_title.slice(0, 40) + "..."
//                       : post.board_title}
//                   </td> */}
//                   <td
//                     className="truncate-title"
//                     title={post.board_title ?? "제목 없음"}
//                   >
//                     {post.board_title?.length > 40
//                       ? post.board_title.slice(0, 40) + "..."
//                       : post.board_title ?? "제목 없음"}
//                   </td>

//                   <td>{post.user_id}</td>
//                   <td>
//                     {post.board_regdate
//                       ? new Date(post.board_regdate).toLocaleDateString("ko-KR")
//                       : "날짜 없음"}
//                   </td>
//                   <td>{post.board_views ?? 0}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">게시글이 없습니다.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* 페이지네이션 */}
//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={currentPage === index + 1 ? "active" : ""}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BoardList;

/*import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/components_css/board/BoardList.css";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../index/board/CenterBar/ImageSlider.jsx";

const BoardList = ({ boardType, sortType }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/api/board/list")
      .then((response) => {
        let fetchedPosts = response.data;

        if (boardType) {
          fetchedPosts = fetchedPosts.filter(
            (post) => post.boardType === boardType
          );
        }

        if (sortType === "views") {
          fetchedPosts.sort((a, b) => b.boardViews - a.boardViews);
        } else if (sortType === "latest") {
          fetchedPosts.sort(
            (a, b) => new Date(b.boardRegdate) - new Date(a.boardRegdate)
          );
        }

        setPosts(fetchedPosts);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [boardType, sortType]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ImageSlider cards={posts.slice(0, 10)} />

      <div className="board-table-container">
        <table className="board-table">
          <thead>
            <tr>
              <th>게시판</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr
                  key={post.boardId ?? `${post.boardTitle}-${Math.random()}`}
                  onClick={() => navigate(`/board/detail/${post.boardId}`)}
                >
                  <td>{post.boardType ?? "유형 없음"}</td>
                  <td
                    className="truncate-title"
                    title={post.boardTitle ?? "제목 없음"}
                  >
                    {post.boardTitle?.length > 40
                      ? post.boardTitle.slice(0, 40) + "..."
                      : post.boardTitle ?? "제목 없음"}
                  </td>
                  <td>{post.userId ?? "작성자 없음"}</td>
                  <td>
                    {post.boardRegdate
                      ? new Date(post.boardRegdate).toLocaleDateString("ko-KR")
                      : "날짜 없음"}
                  </td>
                  <td>{post.boardViews ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardList;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/components_css/board/BoardList.css";
import { useNavigate } from "react-router-dom";

const boardTypeMap = {
  notice: "공지사항",
  free: "자유게시판",
  hobby: "취미게시판",
  play: "놀거리게시판",
  food: "맛집게시판",
  sell: "거래게시판",
};

const BoardList = ({ boardType, sortType }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/api/board/list")
      .then((response) => {
        let fetchedPosts = response.data;

        // boardType이 있으면 해당 글만 필터링
        if (boardType) {
          fetchedPosts = fetchedPosts.filter(
            (post) => post.boardType === boardType
          );
        }

        // 정렬 처리
        if (sortType === "views") {
          fetchedPosts.sort((a, b) => b.boardViews - a.boardViews);
        } 
        else if (sortType === "latest") {
          fetchedPosts.sort(
            (a, b) => new Date(b.boardRegdate) - new Date(a.boardRegdate)
          );
        }
        else if (sortType === "recommend") {
          fetchedPosts.sort((a, b) => (b.boardRecommend || 0) - (a.boardRecommend || 0));
        }

        setPosts(fetchedPosts);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [boardType, sortType]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="board-table-container">
        <table className="board-table">
          <thead>
            <tr>
              <th>게시판</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr
                  key={post.boardId ?? `${post.boardTitle}-${Math.random()}`}
                  onClick={() => navigate(`/board/detail/${post.boardId}`)}
                >
                  {/* <td>{post.boardType ?? "유형 없음"}</td> */}
                  <td>{boardTypeMap[post.boardType] ?? "유형 없음"}</td>

                  <td
                    className="truncate-title"
                    title={post.boardTitle ?? "제목 없음"}
                  >
                    {post.boardTitle?.length > 40
                      ? post.boardTitle.slice(0, 40) + "..."
                      : post.boardTitle ?? "제목 없음"}
                  </td>
                  <td>{post.userId ?? "작성자 없음"}</td>
                  <td>
                    {post.boardRegdate
                      ? new Date(post.boardRegdate).toLocaleDateString("ko-KR")
                      : "날짜 없음"}
                  </td>
                  <td>{post.boardViews ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardList;
