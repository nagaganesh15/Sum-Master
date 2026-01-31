import {useState} from 'react'
import './App.css'

function generateresult(){
    const res:number[]=[];
    let arr:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]

    for(let i=2;i<6;i++){
      let sum=0
      for(let j=0;j<i;j++){
        const ran=Math.floor(Math.random()*arr.length);
        sum+=arr[ran];
        arr.splice(ran,1)
      }
      res.push(sum)
    }
    return res;
}

function App(){
    const [enable,setenable]=useState<string[]>(
        Array(14).fill('white')
    )
    let [value,setvalue]=useState<(number|string)[]>(Array(14).fill(''))
    let [num,setnum]=useState<number[]>([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
    const row:number[]=[1,4,8,13]
    const [res]=useState<number[]>(generateresult())
    const [result,setresult]=useState<string>('')
    const [butt,setbutt]=useState(<></>)
    


    function clear(){
      setenable(Array(14).fill('white'));
      setvalue(Array(14).fill(''));
      setnum([1,2,3,4,5,6,7,8,9,10,11,12,13,14])

    }


    function check(){
        let sum:number=0;
        let c:number=0
        for(let i=0;i<14;i++){
            sum += Number(value[i]) || 0;
            if(sum==res[Math.floor(i/4)]){
                c+=1
            }
            if(row.includes(i)){
                sum=0;
            }
        }
        if (c === 4) 
        {
            setresult("🎉 Congratulations! Excellent job! You solved it perfectly! 🌟");
            setbutt(<button onClick={()=>window.location.reload()}>Next Challenge</button>)
        } 
        else 
        {
            setresult("❌ Oops! Not quite right. Try again, you can do it! 💪😊");
            setTimeout(()=>{
                setresult("");
            },3000);
        }
        

    }

    function change(ind:number){
        if (enable[ind]==='yellow'){
            const val=value[ind];
            if (typeof val==='number'){
                setnum(prev=>[...prev,val]);
            }
            setvalue(prev=>
                prev.map((v,i)=>(i===ind?'':v))
            )
            setenable(prev =>
              prev.map((v, i) => (i === ind ? 'blue' : v))
            );

        }
        setenable(prev =>
            prev.map((val, i) => {
            if (val === 'yellow') return 'yellow';
            if (i === ind) return 'blue';
            return 'white';
            })
        );

    }

    function insert(numb:number){
        const place=enable.findIndex(val=>val==='blue')
        if (place!=-1){
        setvalue(arr=>
            arr.map((val,i)=>(
                i===place?numb:val
            ))
        )
        setenable(prev=>
            prev.map((val,i)=>(
                i===place?'yellow':val
            ))
        )

        setnum(prev=>
            prev.filter(n=>n!=numb)
        )
    }

    }
    return (
        <div className="app">

            <h1 className="title">Sum Master: Brain Puzzle Game</h1>

            <div className="game-board">
            {enable.map((bu, i) => (
                <span key={i}>
                <button
                    className={
                    bu === 'white'
                        ? 'bgwhite'
                        : bu === 'yellow'
                        ? 'bgyellow'
                        : 'bgblue'
                    }
                    onClick={() => change(i)}
                >
                    {value[i]}
                </button>

                {row.includes(i) ? (<>= {res[Math.floor(i / 4)]}<br /></>) : (<>+</>)}
                </span>
            ))}
            </div>

            <div className="number-panel">
            {num.map((val, i) => (
                <button
                key={i}
                className="number-btn"
                onClick={() => insert(val)}
                >
                {val}
                </button>
            ))}
            </div>

            <div className="controls">
            <button className="clear-btn" onClick={clear}>
                Clear
            </button>

            <button className="check-btn" onClick={check}>
                Check
            </button>
            </div>

            <p className="result">{result}</p>

            <div className="next-btn">
            {butt}
            </div>

        </div>
    );

}
export default App;