import './App.css';
import Slider from '@material-ui/core/Slider';
import {useState, useEffect, useRef} from 'react'

import {motion} from 'framer-motion'

import DragDrop from './DragDrop'



function App() {

  // const [divider, setDivider] = useState([1,2])
  const [topValue, setTopValue] = useState(1)
  const [bottomValue, setBottomValue] = useState(2)

  useEffect(() => {
    if(topValue > bottomValue) setTopValue(bottomValue)
    setColoredPices(new Array(topValue).fill(0,0,topValue).map((v, idx) => {
      return idx
    }))
    const topArrayMarkers = new Array(bottomValue).fill(0,0,bottomValue).map((val, idx) => {return {value:idx + 1, label: idx + 1}});
    setMarksTop(topArrayMarkers)
    setCurrentPie(bottomValue)
  }, [bottomValue, topValue])

  const piesDPaths = {
    
    2:[
      "M31 106C31 86.1088 38.9018 67.0322 52.967 52.967C67.0322 38.9018 86.1088 31 106 31C125.891 31 144.968 38.9018 159.033 52.967C173.098 67.0322 181 86.1088 181 106L106 106L31 106Z",
      "M181 106C181 125.891 173.098 144.968 159.033 159.033C144.968 173.098 125.891 181 106 181C86.1088 181 67.0322 173.098 52.967 159.033C38.9018 144.968 31 125.891 31 106L106 106H181Z"
    ],
    3:[
      "M143.452 41.1C154.853 47.6826 164.321 57.1505 170.904 68.5519C177.486 79.9533 180.952 92.8866 180.952 106.052C180.952 119.217 177.486 132.15 170.904 143.552C164.321 154.953 154.853 164.421 143.452 171.004L105.952 106.052L143.452 41.1Z",
      "M143.452 171.004C132.05 177.586 119.117 181.052 105.952 181.052C92.7866 181.052 79.8533 177.586 68.4519 171.004C57.0505 164.421 47.5826 154.953 41 143.552C34.4174 132.15 30.9519 119.217 30.9519 106.052L105.952 106.052L143.452 171.004Z",
      "M30.9519 106.052C30.9519 92.8867 34.4174 79.9534 41 68.5519C47.5826 57.1505 57.0505 47.6826 68.4519 41.1C79.8533 34.5174 92.7866 31.0519 105.952 31.0519C119.117 31.0519 132.05 34.5174 143.452 41.1L105.952 106.052L30.9519 106.052Z",
    ],
    4:[
      "M106 31C115.849 31 125.602 32.9399 134.701 36.709C143.801 40.4781 152.069 46.0026 159.033 52.967C165.997 59.9314 171.522 68.1993 175.291 77.2988C179.06 86.3982 181 96.1509 181 106L106 106L106 31Z",
      "M181 106C181 115.849 179.06 125.602 175.291 134.701C171.522 143.801 165.997 152.069 159.033 159.033C152.069 165.997 143.801 171.522 134.701 175.291C125.602 179.06 115.849 181 106 181L106 106L181 106Z",
      "M106 181C96.1508 181 86.3982 179.06 77.2987 175.291C68.1993 171.522 59.9314 165.997 52.967 159.033C46.0026 152.069 40.4781 143.801 36.709 134.701C32.9399 125.602 31 115.849 31 106L106 106L106 181Z",
      "M31 106C31 96.1509 32.9399 86.3982 36.709 77.2988C40.4781 68.1993 46.0026 59.9314 52.967 52.967C59.9314 46.0026 68.1993 40.4781 77.2987 36.709C86.3981 32.9399 96.1509 31 106 31L106 106L31 106Z"
    ],
    5:[
      "M109.91 31.0878C125.727 31.9167 140.875 37.7316 153.184 47.699C165.493 57.6665 174.33 71.2748 178.429 86.5736L105.985 105.985L109.91 31.0878Z",
      "M178.429 87.1216C182.529 102.42 181.68 118.624 176.004 133.411C170.328 148.197 160.116 160.807 146.833 169.433L105.985 106.533L178.429 87.1216Z",
      "M146.833 168.885C133.55 177.512 117.877 181.711 102.06 180.882C86.2431 180.053 71.0948 174.238 58.786 164.271L105.985 105.985L146.833 168.885Z",
      "M58.786 164.271C46.4772 154.303 37.6398 140.695 33.5406 125.396C29.4413 110.098 30.2905 93.8938 35.9665 79.1074L105.985 105.985L58.786 164.271Z",
      "M35.9665 79.1074C41.6425 64.3209 51.8539 51.7109 65.1371 43.0847C78.4203 34.4585 94.0935 30.2588 109.91 31.0878L105.985 105.985L35.9665 79.1074Z"
    ],
    6:[
      "M143.452 41.1C154.853 47.6826 164.321 57.1505 170.904 68.5519C177.486 79.9533 180.952 92.8867 180.952 106.052L105.952 106.052L143.452 41.1Z",
      "M180.952 106.052C180.952 119.217 177.486 132.15 170.904 143.552C164.321 154.953 154.853 164.421 143.452 171.004L105.952 106.052L180.952 106.052Z",
      "M143.452 171.004C132.05 177.586 119.117 181.052 105.952 181.052C92.7866 181.052 79.8533 177.586 68.4519 171.004L105.952 106.052L143.452 171.004Z",
      "M68.4519 171.004C57.0505 164.421 47.5826 154.953 41 143.552C34.4174 132.15 30.9519 119.217 30.9519 106.052L105.952 106.052L68.4519 171.004Z",
      "M30.9519 106.052C30.9519 92.8867 34.4174 79.9534 41 68.5519C47.5826 57.1505 57.0505 47.6826 68.4519 41.1L105.952 106.052L30.9519 106.052Z",
      "M68.4519 41.1C79.8534 34.5174 92.7867 31.0519 105.952 31.0519C119.117 31.0519 132.05 34.5174 143.452 41.1L105.952 106.052L68.4519 41.1Z"
    ],
    7:[
      "M135.78 37.3262C146.108 41.8384 155.286 48.6203 162.632 57.1679C169.979 65.7154 175.304 75.8087 178.213 86.6976L105.753 106.053L135.78 37.3262Z",
      "M178.198 86.642C181.115 97.5287 181.541 108.933 179.444 120.007C177.347 131.081 172.781 141.54 166.086 150.606L105.753 106.053L178.198 86.642Z",
      "M166.12 150.56C159.432 159.632 150.785 167.079 140.823 172.349C130.86 177.619 119.838 180.576 108.575 181L105.753 106.053L166.12 150.56Z",
      "M108.632 180.998C97.37 181.431 86.1549 179.32 75.8208 174.821C65.4866 170.323 56.299 163.554 48.9411 155.016L105.753 106.053L108.632 180.998Z",
      "M48.8081 154.861C41.4734 146.304 36.1617 136.203 33.2678 125.311C30.3739 114.418 29.9723 103.013 32.0927 91.9433L105.753 106.053L48.8081 154.861Z",
      "M32.0817 91.9998C34.1936 80.9288 38.7736 70.476 45.4811 61.4186C52.1887 52.3611 60.8513 44.9319 70.8252 39.683L105.753 106.053L32.0817 91.9998Z",
      "M70.7744 39.7099C80.7442 34.4533 91.7706 31.5114 103.034 31.1027C114.297 30.6941 125.508 32.8292 135.832 37.3493L105.753 106.053L70.7744 39.7099Z"
    ],
    8:[
      "M159.099 53.033C166.063 59.9974 171.588 68.2653 175.357 77.3648C179.126 86.4642 181.066 96.2169 181.066 106.066H106.066L159.099 53.033Z",
      "M181.066 106.066C181.066 115.915 179.126 125.668 175.357 134.767C171.588 143.867 166.063 152.135 159.099 159.099L106.066 106.066H181.066Z",
      "M159.099 159.099C152.135 166.063 143.867 171.588 134.767 175.357C125.668 179.126 115.915 181.066 106.066 181.066V106.066L159.099 159.099Z",
      "M106.066 181.066C96.2169 181.066 86.4642 179.126 77.3648 175.357C68.2654 171.588 59.9974 166.063 53.033 159.099L106.066 106.066L106.066 181.066Z",
      "M53.0331 159.099C46.0687 152.135 40.5442 143.867 36.7751 134.767C33.006 125.668 31.0661 115.915 31.0661 106.066H106.066L53.0331 159.099Z",
      "M31.066 106.066C31.066 96.2169 33.006 86.4642 36.7751 77.3648C40.5442 68.2654 46.0686 59.9974 53.033 53.033L106.066 106.066L31.066 106.066Z",
      "M53.033 53.033C59.9974 46.0686 68.2654 40.5442 77.3648 36.7751C86.4642 33.006 96.2169 31.066 106.066 31.066V106.066L53.033 53.033Z",
      "M106.066 31.066C115.915 31.066 125.668 33.006 134.767 36.7751C143.867 40.5442 152.135 46.0686 159.099 53.033L106.066 106.066L106.066 31.066Z"
    ],
    9:[
      "M163.116 57.8533C174.449 71.3594 180.661 88.4263 180.662 106.057L105.662 106.062L163.116 57.8533Z",
      "M180.662 106.062C180.662 123.693 174.451 140.761 163.119 154.267L105.662 106.062H180.662Z",
      "M163.116 154.271C151.783 167.778 136.054 176.859 118.691 179.922L105.662 106.062L163.116 154.271Z",
      "M118.686 179.923C101.323 182.985 83.4362 179.831 68.1668 171.017L105.662 106.062L118.686 179.923Z",
      "M68.1623 171.014C52.8935 162.199 41.2185 148.286 35.1872 131.719L105.662 106.062L68.1623 171.014Z",
      "M35.1854 131.714C29.1552 115.146 29.1546 96.9839 35.1836 80.4158L105.662 106.062L35.1854 131.714Z",
      "M35.1854 80.4109C41.2155 63.8433 52.8896 49.9296 68.1578 41.1131L105.662 106.062L35.1854 80.4109Z",
      "M68.1624 41.1105C83.4312 32.295 101.318 29.1405 118.681 32.2009L105.662 106.062L68.1624 41.1105Z",
      "M118.686 32.2018C136.049 35.2634 151.779 44.3441 163.112 57.8493L105.662 106.062L118.686 32.2018Z"
    ],
    10:[
      "M166.437 61.9763C175.746 74.7899 180.76 90.2217 180.76 106.06L105.76 106.06L166.437 61.9763Z",
      "M180.76 106.06C180.76 121.899 175.746 137.33 166.437 150.144L105.76 106.06H180.76Z",
      "M166.437 150.144C157.127 162.958 144 172.495 128.937 177.389L105.76 106.06L166.437 150.144Z",
      "M128.937 177.389C113.873 182.284 97.6472 182.284 82.584 177.389L105.76 106.06L128.937 177.389Z",
      "M82.584 177.389C67.5207 172.495 54.3936 162.958 45.084 150.144L105.76 106.06L82.584 177.389Z",
      "M45.0838 150.144C35.7742 137.33 30.7601 121.899 30.7601 106.06L105.76 106.06L45.0838 150.144Z",
      "M30.7603 106.06C30.7603 90.2217 35.7744 74.7898 45.084 61.9763L105.76 106.06L30.7603 106.06Z",
      "M45.084 61.9763C54.3936 49.1627 67.5207 39.6253 82.584 34.7309L105.76 106.06L45.084 61.9763Z",
      "M82.584 34.7309C97.6472 29.8366 113.873 29.8366 128.937 34.7309L105.76 106.06L82.584 34.7309Z",
      "M128.937 34.7309C144 39.6253 157.127 49.1627 166.437 61.9763L105.76 106.06L128.937 34.7309Z",
    ]

  }

  const [currentPie, setCurrentPie] = useState(2)
  const [devidedByArr, setDevidedByArr] = useState([0])

  const [marksTop, setMarksTop] = useState([{value:1, label: 1,}]) 
  const marksBottom = [1,2,3,4,5,6,7,8,9,10].map(i => {return {value:i, label: i,}})

  const [coloredPices, setColoredPices] = useState([0])

  const test = (i) => {
    console.log(i,"mhmm")
  } 

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  const svgContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const svgItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
    exit:{ opacity: 0 }
  }

  const dragItems = {
    start:{opacity: 0},

    dragConstraints: {
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }
  }

  const refTest = useRef(null)
  const cardValue2 = useRef(null)
  const cardValue3 = useRef(null)
  const cardValue4 = useRef(null)
  const cardValue5 = useRef(null)
  const cardValue6 = useRef(null)

  const dropAreaTop = useRef(null)
  const dropAreaBottom = useRef(null)

  const dropAreas = [dropAreaTop, dropAreaBottom]

  const [isCardOver, setIsCardOver] = useState(false)
  const [dragedCard, setDragedCard] = useState(null)



  const handelDrag = (card) => {

    const tmpVectorArray = card.current.style.transform.replace('translate3d(', '' ).replace(', 0px) scale(1, 1)', '').replace('px', '').replace('px', '').split(',')

    const dragCardVector = {
      x: parseInt(tmpVectorArray[0]),
      y: parseInt(tmpVectorArray[1])
    }

    const dragCardMatrix = {
      right: (card.current.offsetLeft + dragCardVector.x) + card.current.offsetWidth,
      left: (card.current.offsetLeft + dragCardVector.x),
      top: (card.current.offsetTop + dragCardVector.y),
      bottom: (card.current.offsetTop + dragCardVector.y) + card.current.offsetHeight
    }

    dropAreas.forEach(area => {
      const dropAreaMatrix = {
        right: area.current.offsetLeft + area.current.offsetWidth,
        left: area.current.offsetLeft,
        top: area.current.offsetTop,
        bottom: area.current.offsetTop + area.current.offsetHeight
      }
  
      //check collision
      if((
        (dragCardMatrix.bottom < dropAreaMatrix.bottom && dragCardMatrix.bottom > dropAreaMatrix.top) && 
        ((dragCardMatrix.right < dropAreaMatrix.right && dragCardMatrix.right > dropAreaMatrix.left) || 
        (dragCardMatrix.left < dropAreaMatrix.right && dragCardMatrix.left > dropAreaMatrix.left))
        )||(
        (dragCardMatrix.top > dropAreaMatrix.top && dragCardMatrix.top < dropAreaMatrix.bottom) &&
        ((dragCardMatrix.right < dropAreaMatrix.right && dragCardMatrix.right > dropAreaMatrix.left) || 
        (dragCardMatrix.left < dropAreaMatrix.right && dragCardMatrix.left > dropAreaMatrix.left))
        )) {
          if(isCardOver == false) {
            setIsCardOver(true)
            setDropAreaInFocus(area)
          }}
        else {
          if(isCardOver == true) {
            setIsCardOver(false)
            setDropAreaInFocus(null)
          }
        }
    });
    // console.log(element?.x, dropAreaRef.current.offsetTop);
    // console.log(info.point.y == dropAreaRef.current.offsetTop);
  }

  const handelDragEnd = () => {
    setShowDropAreas(false)
    if(setDropAreaInFocus == null) return

  }
  
  useEffect(() => {
    // console.log("is card" , isCardOver);
  }, [isCardOver])
  
  const [dropAreaInFocus, setDropAreaInFocus] = useState(null)
  const [showDropAreas, setShowDropAreas] = useState(false)

  const [timesDeviationTop, setTimesDeviationTop] = useState('')
  const [timesDeviationBottom, setTimesDeviationBottom] = useState('')

  return (
    <div className="App">
      <header className="App-header">

        
        <div className="drag-area-container" ref={refTest}>
          
          <motion.ul className="drag-numbers-container">
            <li className="drag-number-cell">
              <motion.div 
                ref={cardValue2}
                dragElastic={1}
                onDragStart={() => setShowDropAreas(true)}
                onDragEnd={() => setShowDropAreas(false)}
                drag 
                dragConstraints={{left:0, top:0, right:0 , bottom:0}}
                onDrag={() => handelDrag(cardValue2)}
                className="drag-number"
              >2</motion.div>
            </li>
            <li className="drag-number-cell">
              <motion.div 
                ref={cardValue3} 
                dragElastic={1}
                onDragStart={() => setShowDropAreas(true)}
                onDragEnd={() => handelDragEnd()}
                drag 
                dragConstraints={{left:0, top:0, right:0 , bottom:0}}
                onDrag={() => handelDrag(cardValue3)} 
                className="drag-number"
              >3</motion.div>
            </li>
          </motion.ul>

          <ul className="deviation-frames-container">
            <li className="deviation-frame">
              <div className="deviation-top">1</div>
              <div className="deviation-bar"></div>
              <div className="deviation-bottom">2</div>
            </li>
            <li className="deviation-frame undefined-multiplication">
              <div 
                ref={dropAreaTop} 
                style={{
                    border: showDropAreas ? 'dotted 2px' : '',
                    borderColor: (isCardOver && dropAreaInFocus == dropAreaTop) ? 'red' : ''
                }} 
                className="deviation-top"
              >{timesDeviationTop}</div>
              <div className="deviation-bar"></div>
              <div 
                ref={dropAreaBottom}
                style={{
                    border: showDropAreas ? 'dotted 2px' : '',
                    borderColor: (isCardOver && dropAreaInFocus == dropAreaBottom) ? 'red' : ''
                }} 
                className="deviation-bottom"
              >{timesDeviationBottom}</div>
            </li>
            <li className="deviation-frame">
              <div className="deviation-top"></div>
              <div className="deviation-bar"></div>
              <div className="deviation-bottom"></div>
            </li>
          </ul>
        {/* <div ref={dropAreaRef} className="drop-area"></div> */}
        </div>


        <DragDrop/>


      {/* <Example/> */}
        {/* <SvgCircleTest/> */}
        {/* <SvgCircleStrokePie/> */}
        {/* <SvgCircleSplit/> */}
        {/* <split10/> */}

        <motion.div 
          className="content-container"
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* <motion.div variants={item}>
            <Slider
              value={topValue}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks={marksTop}
              min={1}
              max={bottomValue}
              valueLabelDisplay="auto"
              id="slider1"
              style={{color:'#FA9D10'}}
              onChange={(e,val) => setTopValue(val)}
            />
          </motion.div> */}

          <motion.div className="inner-content" variants={item}>

            {/* <div className="divider-container">
              <h1>{topValue}</h1>
              <h1>{bottomValue}</h1>
            </div> */}
            <motion.svg width="213" height="213" viewBox="0 0 213 213" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{cursor:'pointer'}}
              className="container"
              variants={svgContainer}
              initial="hidden"
              animate="visible"
            >
            <rect width="212.13" height="212.13" fill="white"/>
              {currentPie != 1 ? piesDPaths[currentPie].map((dpath, idx) => (
                  <motion.path 
                    variants={svgItem}
                    initial="hidden"
                    animate="visible"
                    onClick={() => test(idx)} 
                    key={idx} 
                    d={dpath} 
                    fill={coloredPices.includes(idx) ? "#FA9D10" : "#ffffff"} 
                    stroke="#333333" strokeWidth="1"/>
                )) : (
                  <circle cx="106" cy="106" r="74.5" fill="#FA9D10" stroke="#333333"/>
                )
              }
            
            </motion.svg>
          </motion.div>
          {/* <Slider
            value={bottomValue}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks={marksBottom}
            min={1}
            max={10}
            valueLabelDisplay="auto"
            id="slider1"
            style={{color:'#FA9D10'}}
            onChange={(e,val) => setBottomValue(val)}
          /> */}
        </motion.div>
      </header>
      
    </div>
  );
}

export default App;
