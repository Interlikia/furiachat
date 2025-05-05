import { TwitterTweetEmbed } from 'react-twitter-embed';

// Página responsável em reunir as notícias do time da FURIA, atualmente implementado estaticamente um tweet e um link para o Perfil da FURIA no X
const Noticias = () => {
    return (
      <div>
        <div className='tweets'>
        <TwitterTweetEmbed tweetId={'1918757721429434861'} />
        </div>
        <a class="twitter-timeline" href="https://twitter.com/FURIA?ref_src=twsrc%5Etfw" style={{color: 'white'}}>Tweets by FURIA</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      )
};

export default Noticias;