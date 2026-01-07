import React from 'react'

const Result = ({ score, totalQuestion, restart }) => {
    return (
        <div>
            <h2>Kết Quả</h2>
            <p className="result">Bạn Đã Trả Lời Đúng {score}/{totalQuestion} Câu 👏👏👏</p>
            <div className="resultButtonsContainer">
                <button className="result-button">Xem Lại</button>
                <button className="result-button" onClick={restart}>Làm Lại</button>
            </div>
        </div>
    )
}

export default Result
