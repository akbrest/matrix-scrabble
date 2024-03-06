import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchSingleGame } from '../../redux/actions/gamesActions';
import { useSelector, useDispatch } from 'react-redux';
import GameBoard from './GameBoard';

const SingleGame = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const id = params.id!;

    const game = useSelector((state: RootState) =>
        state.games.currentGame.game
    );

    useEffect(() => {
        dispatch(fetchSingleGame(id));
    }, [dispatch, id]);

    return (
        <div>
            {
                game && (
                    <div>
                        <h2>SingleGame with id: {game.id}</h2>
                        <div>Word: {game.word}</div>
                        <div>
                            <GameBoard id={game.id} word={game.word} language={game.language} key="ksadks" />
                        </div>
                    </div>


                )
            }
        </div>
    )
};

export default SingleGame;
