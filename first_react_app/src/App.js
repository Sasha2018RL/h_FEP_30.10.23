import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav/Nav";
import LeftBar from "./components/LeftBar/LeftBar";
import EmojiVote from "./components/EmojiVote/EmojiVote";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
    return (
        <div className="App">
            <Nav></Nav>
            <div className="Container">
                <LeftBar></LeftBar>
                <main className="Main">
                    <EmojiVote emojis={['😂', '❤️', '❤️‍🔥', '🤡', '💩']}></EmojiVote>
                    <ToDoList></ToDoList>
                    <img src={logo} className="App-logo" alt="logo"/>
                </main>
            </div>
        </div>
    );
}

export default App;
