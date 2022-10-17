import './App.css';
import Image4 from './assets/img4.png'
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Images from './ImagesArray'


function App() {

  const [cardData, setCardData] = useState([])
  const [prevCard, setPrevCrad] = useState(-1)
  const [matchCounter, setMatchCounter] = useState(0)
  const [matchCounterForUser2, setMatchCounterForUser2] = useState(0)
  const [user, setUser] = useState(true)




  useEffect(() => {
    suffleData()
  }, [])


  const suffleData = () => {
    const updatedImages = Images.map((item) => {
      item.status = ''
      return item
    })
    let shuffle = updatedImages.sort(() => Math.random() - 0.5)
    setCardData(shuffle)
  }


  const handleCardClick = (index, item) => {
    if (item.status !== 'show') {
      if (prevCard === -1) {
        cardData[index].status = 'show'
        setPrevCrad(index)
      }
      else if (cardData[index].slug === cardData[prevCard].slug) {
        cardData[index].status = 'show'
        if (user) {
          let counter = matchCounter + 1
          setMatchCounter(counter)
          setTimeout(() => {
            if (matchCounterForUser2 + matchCounter == (cardData.length / 2) - 1) {
              // alert('You won the game')
              if (matchCounterForUser2 > matchCounter) {
                alert('user 2 won the game')
              }
              else {
                alert('user 1 won the game')
              }
              suffleData()
              setMatchCounter(0)
            }
          }, 1000);
          setPrevCrad(-1)
        }
        else {
          let counter = matchCounterForUser2 + 1
          setMatchCounterForUser2(counter)
          setTimeout(() => {
            if (matchCounterForUser2 + matchCounter == (cardData.length / 2) - 1) {
              // alert('You won the game')
              if (matchCounterForUser2 > matchCounter) {
                alert('user 2 won the game')
              }
              else {
                alert('user 1 won the game')
              }
              suffleData()
              setMatchCounterForUser2(0)
            }
          }, 1000);
          setPrevCrad(-1)
        }

      }
      else {
        cardData[index].status = 'show'
        setTimeout(() => {
          setUser(!user)
          cardData[index].status = ''
          cardData[prevCard].status = ''
          setCardData([...cardData])
        }, 1000);
        setPrevCrad(-1)
      }
    }
  }


  return (
    <div className="App">
      <h1>Card memory game</h1>

      <h3>User 1 Score:{matchCounter}</h3>
      <h3>user 2 score:{matchCounterForUser2}</h3>

      <Container>
        <Row className="show-grid">
          {
            cardData.length > 0 && cardData.map((item, index) => {
              return (
                <Col onClick={() => handleCardClick(index, item)} key={index} md={2} style={
                  { cursor: 'pointer' }
                }>
                  <br />
                  {item.status == 'show'
                    ?
                    <img key={index} height={127} width={119} src={item.url} />
                    :
                    <img key={index} height={127} width={119} src={Image4} />}
                </Col>

              )
            })
          }
        </Row>
      </Container>
    </div>
  );
}

export default App;


// {
//   response :{

//   productID:{
//       10,20,30,40,50
//   }
//   }
// }