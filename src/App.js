/*eslint-disable*/
import './App.css';
import { useState } from 'react';


const Modal = (props) => {
  return(
    <div className="modal">
      <h4>{props.posts[props.postView]}</h4>
      <p>Date</p>
      <p>Detail</p>
      <button onClick={()=>{
        let copy = [...props.posts]
        copy[0] = 'cottlin'
        props.setPosts(copy)
      }}>change</button>
    </div>
  )
}

function App() {

  let [posts, setPosts] = useState(['java','vue','react']);
  let [postsDate, setPostDate] = useState(['2월 17일', '2월 9일', '1월 1일'])
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [postView, setpostView] = useState(0);
  let [newValue, setNewValue] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <div>Reactblog</div>
      </div>

      {
        posts.map((a,i)=>{
          return(
            <div className="list" key={i}>
              <h4 onClick={()=>{setModal(!modal); setpostView(i)}}>{a} <span onClick={(e)=>{
                // 상위 이벤트 버블링 멈추기
                e.stopPropagation();
                let likeArr = [...like]
                likeArr[i] += 1
                setLike(likeArr)
              }}>👍</span>{like[i]}
              <button onClick={ () =>{
                let postsArr = [...posts]
                postsArr.splice(i,1)
                setPosts(postsArr)
              }}>delete</button>
              </h4>
              <p>{postsDate[i]} 발행</p>
            </div>
          )
        })
      }

      <button onClick={()=>{
        let arr = [...posts]
        arr.sort()
        setPosts(arr)
      }}> sort</button>


      {
        modal ? <Modal posts={posts} setPosts={setPosts} postView={postView} /> : null
      }
      
      <input onChange={(e)=>{
        setNewValue(e.target.value)
      }}/>
      <button onClick={()=>{
        if(newValue == 0){
          alert("포스트를 입력하여 주세요.")
        }else{
          setPosts([newValue,...posts]);

          let likeArr = [...like]
          likeArr.unshift(0)
          setLike(likeArr)

          let newDateArr = [...postsDate]
          let date = new Date();
          let newDate = (date.getMonth()+1+"월 "+date.getDate()+"일")
          newDateArr.unshift(newDate);
          setPostDate(newDateArr)
        }
      }}>save</button>

    </div>
  );
}



export default App;
