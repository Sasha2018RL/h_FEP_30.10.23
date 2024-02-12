import {useState} from "react";

export default function EmojiVote({emojis = []}) {
    const votes_obj = emojis.map((emoji, index) => ({
        emoji: emoji,
        votes: 0,
        id: index
    }));

    const [votes, setVotes] = useState(votes_obj);
    const [showWinners, setShowWinners] = useState(false);

    function voteHandler(emojiId) {
        setVotes(votes.map(vote => {
            if (vote.id === emojiId) {
                vote.votes++;
            }
            return vote;
        }))
    }

    const winner = votes.reduce((max, vote) => {
        if(!max || max.votes < vote.votes){
            max = vote;
        }

        return max;
    }, undefined);

    function showWinnerHandler(){
        setShowWinners(!showWinners);
    }

    return (
        <div>
            <div>
                {votes.map(vote =>
                    <button onClick={()=>{voteHandler(vote.id)}} key={vote.id}>{vote.emoji} - {vote.votes}</button>
                )}
            </div>
            <div>
                <button onClick={showWinnerHandler}>{showWinners ? 'Скрыть победителя' : 'Показать победителя'}</button>
                {showWinners && <p>Winner with {winner.votes} votes is <h1>{winner.emoji}</h1></p>}
            </div>
        </div>
    )
}