import React, { useState } from 'react'
import { DrawCrossWord } from './drawCrossword/draw'
import jsPdf from 'jspdf'
import domtoimage from 'dom-to-image';


export default function Generate() {
    const [data, setdata] = useState("")
    // const [wordList, setWordList] = useState([])

    const generate = () => {
        function csvToArray(csv) {
            var rows = csv.split("\n");

            return rows.map(function (row) {
                return row.split(",");
            });
        }
        var wordList = csvToArray(data)
        // setWordList(wordList)
        // var result = Crossword(wordList)
        DrawCrossWord(wordList)

    }

    const generateRandom = () => {
        DrawCrossWord()
    }



    const generatePDF = () => {
        const node = document.querySelector(".crossword");
        document.querySelector(".crossword-buttons").style.visibility = 'hidden'
        //document.querySelector(".table.crossword-grid").style.max = 'hidden'
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            const pdf = new jsPdf("p", "mm", "a4");
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();

            pdf.addImage(img, 'PNG', 0, 0, width, height);
            pdf.save("mycross.pdf");
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
        setTimeout(() => {
            document.querySelector(".crossword-buttons").style.visibility = 'visible'
        });
    }
    return (
        <>
            <div className="container" style={{ paddingTop: "300px", paddingBottom: "300px" }}>
                <label htmlFor="txtarea" className="mx-auto"> Words And Clue</label>
                <textarea className="form-control" onChange={(e) => { setdata(e.target.value) }} placeholder="" rows="10" cols="50" id="txtarea"></textarea>
                <button onClick={generate} className="btn btn-outline-primary mt-5 mx-auto" type="button">
                    Generate
                </button>
                <button onClick={generateRandom} className="btn btn-outline-primary mx-5 mt-5" type="button">
                    Generate Random
                </button>
                <button onClick={generatePDF} className="btn btn-outline-primary mx-5 mt-5" type="button">
                    save as PDF
                </button>
                <div>
                    <div className="crossword"> </div>
                </div>
            </div>
        </>
    )

}