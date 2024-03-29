import React from 'react';
import { briefMovieInfo, detailedMovieInfo } from '../../../utils/interfaces';
import MovieListChild from '../movie-list-child/movie-list-child.component'
import Home from '../../home/home.component'

import {
  BackgroundImage,
  BackgroundImageContainer,
  ChildContainer,
  ListContainer,
} from './movie-list.styles';
import NoImage from '../../no-image/no-image.component';
import ThemedButton from '../../button/button.component';

// Incoming props.
interface Props {
  movieList: briefMovieInfo[],
  selectedMovie: detailedMovieInfo,
  onSelectMovie: any,
  setScrolling: (val: boolean) => void
  setScrollingTop: (val: number) => void
  addToPlayList: (val: string) => void
  removeFromPlaylist: (val:string) => void,
  playlist: string[]
}

// Displays the search results.
class MovieList extends React.Component<Props, {}> {

  // Handles the scroll behavior of the window.
  componentDidMount() {
    window.addEventListener(
      'scroll',
      (e: Event) => {
        const targetDiv = e.currentTarget as Window;
        const scrollTopValue = targetDiv.scrollY;
        let { setScrolling, setScrollingTop } = this.props;
        scrollTopValue >= 10 ? setScrolling(true) : setScrolling(false);
        setScrollingTop(scrollTopValue)
      },
    );
  }
  render() {
    const { movieList, selectedMovie, addToPlayList, playlist, removeFromPlaylist } = this.props;
    const {
      Title,
      Released,
      Genre,
      Country,
      Runtime,
      imdbRating,
      Rated,
      Poster,
      Plot,
      Language,
      Director,
      Awards,
      Actors,
      imdbID
    } = selectedMovie;
    return (
      movieList.length!== 0?
        <ListContainer>
        {/* Displays the information of the selected movie */}
        <BackgroundImageContainer key={Title}>
          <div className='left-detail'>
            <label className='title' >
              {Title}
            </label>
            <div className='sub-details'>
              <div>
                <label>Genre</label>
                <label>{Genre}</label>
              </div>
              <div>
                <label>Released</label>
                <label>{Released}</label>
              </div>
              <div>
                <label>Country</label>
                <label>{Country}</label>
              </div>
              <div>
                <label>Awards</label>
                <label>{Awards}</label>
              </div>
              </div>
              <div className='button'>
              {!playlist.includes(imdbID)?<ThemedButton padding='10px 5px' action={() => addToPlayList(imdbID)}>
                  Add to Playlist
                </ThemedButton> :
                  <ThemedButton padding='10px 5px' action={() => removeFromPlaylist(imdbID)}>
                    Remove from Playlist
                  </ThemedButton>
                }
                
                </div>
          </div>
          <BackgroundImage>
            <div className='image-cover top'>
              <label>{Runtime}</label>
            </div>

            <div className='image-cover right'>
              <div className='star'></div>
              <label>{imdbRating}</label>
            </div>
            <div className='image-cover left'>
              <label>{Rated}</label>
            </div>
              {Poster !== 'N/A' ? <img src={Poster} alt='selected-movie' /> :
                <div className='no-image'><NoImage></NoImage></div>}
          </BackgroundImage>
          <div className='right-detail'>
            <div className='item'>
              <label>Director</label>
              <label>{Director}</label>
            </div>
            <div className='item'>
            <label>Available in</label>
              <label>{Language}</label>
            </div>
            <div className='item'>
              <label>Cast</label>
              <label>{Actors}</label>
            </div>
            <div className='plot'>
              <label>Plot</label>
              <label>{Plot}</label>
            </div>
          </div>
          </BackgroundImageContainer>

        {/* Displays the list of movies searched by the user */}
        <ChildContainer>
          <MovieListChild {...this.props}/>
        </ChildContainer>
      </ListContainer> :
        <Home></Home>
    );
  }
}

export default MovieList;
