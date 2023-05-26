import React,{useRef,useState,useEffect} from 'react'
import useWindowResize from '@/utils/windowdimension'

function Tester() {
    const {width,height} = useWindowResize()
    const draggableRefOne = useRef<HTMLParagraphElement>(null);
    const draggableRefTwo = useRef<HTMLParagraphElement>(null);
    const draggableRefThree = useRef<HTMLParagraphElement>(null);
    const droppableRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [currentRef,setCurrentRef] = useState<any>()



    const reffs = [draggableRefOne,draggableRefTwo,draggableRefThree]
    const elements = [1,2,3]
    const handleDragStart = (id:any)=>(e:any) => {

        const { offsetLeft, offsetTop } = reffs[id-1].current!;
            const x = e.clientX - offsetLeft;
            const y = e.clientY - offsetTop;
            setOffset({ x, y });
            setCurrentRef(reffs[id-1])
            setIsDragging(true);         
      };
    
      const handleDragEnd = () => {
        setIsDragging(false);
      };
    
      const handleDragOver = (e:any) => {
        e.preventDefault();
      };

      const handleDrop = (e:any) => {
        e.preventDefault();
        const { offsetLeft, offsetTop } = droppableRef.current!;
        const x = e.clientX - offsetLeft - 15;
        const y = e.clientY - offsetTop - 15;
        if(currentRef?.current){
            currentRef.current.style.left = `${x}px`;
            currentRef.current.style.top = `${y}px`;
            droppableRef.current!.appendChild(currentRef.current!);
        }
      };

  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'white',display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <div ref={droppableRef} onDragOver={handleDragOver} onDrop={handleDrop}  style={{width:"60%",overflow:"hidden",position:'relative',height:"400px",backgroundColor:"red",marginBottom:"50px"}}></div>
    
            
        <div style={{position:"relative",width:"210px",height:"50px",backgroundColor:"black",borderRadius:"15px"}}>
            {elements.map(element=><p key={element} ref={reffs[elements.indexOf(element)]} 
            draggable onDragStart={handleDragStart(element)} 
            onDragEnd={handleDragEnd}
            
            style={{width:'30px',height:'30px',position:'absolute',top:"10px",left:element==1?'30px':`calc((${element}px * 30) + ((${element}px - 1px) * 30))`,borderRadius:"50%",backgroundColor:"yellow",display:'flex',alignItems:'center',justifyContent:"center"}}>
                {element}
            </p>)}
        
        </div>
        
    </div>
  )
}

export default Tester



/**
 * <p ref={draggableRefOne} onClick={()=>console.log('abc')} draggable onDragStart={handleDragStart(draggableRefOne)} onDragEnd={handleDragEnd} style={{width:'50px',height:'50px',position:'absolute',top:"10px",left:'10px',borderRadius:"50%",backgroundColor:"blue"}}></p>   
        <p ref={draggableRefTwo} draggable onDragStart={handleDragStart(draggableRefTwo)} onDragEnd={handleDragEnd} style={{width:'50px',height:'50px',position:'absolute',top:"10px",left:'70px',borderRadius:"50%",backgroundColor:"blue"}}></p>
 */


/**
 * <div style={{margin:'10px auto',width:'auto',display:"flex",justifyContent:'space-around',alignItems:"center"}}>
                          <p onClick={()=>{setNumbDisplay(false);setItemNumber(()=>itemNumber-1)}} style={{width:'auto',height:"auto",padding:"5px",textAlign:"center",borderRadius:'50%',backgroundColor:"white",boxShadow: '1px 1px 5px rgb(91, 90, 90)'}}>{closeItem}</p>
                          <p onClick={saveNewNumber} style={{width:'auto',height:"auto",padding:"5px",textAlign:"center",borderRadius:'50%',backgroundColor:"white",boxShadow: '1px 1px 5px rgb(91, 90, 90)'}}>{addItem}</p>
                        </div>
 */