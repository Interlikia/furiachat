import React from 'react';

// Página onde mostraria os últimos e próximos jogos, possivelmente pode-se ate configurar um filtro para escolher qual jogo (LoL, Futebol, CS2) gostaria de ver 
const Jogos = () => {
    // Jogos simulados para teste
    const initialMatches = [
        { matchId: '1', team1: 'Team A', team2: 'Team B', score1: 2, score2: 1, status: 'finished', date: '16:00' },
        { matchId: '2', team1: 'Team C', team2: 'Team D', score1: 1, score2: 1, status: 'live', date: '18:00' },
        { matchId: '3', team1: 'Team E', team2: 'Team F', score1: 5, score2: 2, status: 'scheduled', date: '20:00' },
        { matchId: '4', team1: 'Team G', team2: 'Team H', score1: 0, score2: 0, status: 'scheduled', date: '22:00' },
        { matchId: '5', team1: 'Team I', team2: 'Team J', score1: 3, score2: 2, status: 'finished', date: '19:00' }
    ]

    return(
    <div>
        <h1>Jogos</h1>
        <VersusDisplay matches={initialMatches} />
    </div>
    );
}


// Display dos placares
const VersusDisplay = (matches) => {

    const arr = Object.entries(matches);
    const currentMatches = arr[0][1];

    return (
        <div className='container'>
            {currentMatches.map( match => (
                <div key={match.matchId} className='match-card'>
                        <div className = 'team-container'>
                            <span className='team-name'>{match.team1}</span>
                            </div>

                        <div className = 'score-status-container'>
                            <span className='score'> {(match.score1)} - {(match.score2)}</span>
                        </div>

                        <div className = 'team-container'>
                            <span className='team-name'>{match.team2}</span>
                            </div>
                    <div className='score-status-container'>
                    <div className='finished-text'>Status: {match.status}</div>
                    {match.date && (
                        <div className='scheduled-time'>Time: {match.date}</div>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
};



export default Jogos;