import React, { useEffect, useState } from 'react'
import Result from './Result';
const quizData = [
    {
        question: "Trong JavaScript, từ khóa nào được sử dụng để khai báo một biến?",
        options: ["let", "var", "const", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "Câu lệnh nào dưới đây là đúng để khai báo một hàm trong JavaScript?",
        options: ["function myFunction(){}", "def myFunction(){}", "func myFunction(){}}", "myFunction() => {}"],
        answer: "function myFunction(){}",
    },
    {
        question: "Kết quả của biểu thức 5 + '5' trong JavaScript là gì?",
        options: ["55", "10", "Error", "undefined"],
        answer: "55",
    },
    {
        question: "Trong JavaScript, cái gì dưới đây là một kiểu dữ liệu?",
        options: ["string", "number", "boolean", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "Kết quả của biểu thức 0 == false trong JavaScript là gì?",
        options: ["true", "false", "undefined", "NaN"],
        answer: "true",
    },
    {
        question: "Toán tử nào dưới đây dùng để so sánh giá trị và kiểu dữ liệu trong JavaScript?",
        options: ["==", "===", "!=", "<>"],
        answer: "===",
    },
    {
        question: "Câu lệnh nào dưới đây tạo ra một mảng trong JavaScript?",
        options: ["var arr = []", "var arr = {}", "var arr = ()", "var arr = array()"],
        answer: "var arr = []",
    },
    {
        question: "Kết quả của biểu thức '3' - 1 trong JavaScript là gì?",
        options: ["3", "4", "2", "NaN"],
        answer: "2",
    },
    {
        question: "Câu lệnh nào dưới đây được sử dụng để dừng vòng lặp trong JavaScript?",
        options: ["stop", "exit", "break", "continue"],
        answer: "break",
    },
    {
        question: "Khi nào JavaScript trả về giá trị NaN?",
        options: ["Khi chia cho 0", "Khi phép toán không xác định", "Khi trả về không có giá trị", "Khi sử dụng toán tử + với một đối tượng"],
        answer: "Khi phép toán không xác định",
    },
];

const Quiz = () => {
    const [CauTraLoi, setCauTraLoi] = useState("");
    const [UserAnswers, setUserAnswers] = useState(Array.from({
        length: quizData.length
    }));
    const [CurrentQuestion, setCurrentQuestion] = useState(0);
    const LuaChon = (option, index) => {
        setCauTraLoi(option)
        const newUserAnwers = [...UserAnswers];
        newUserAnwers[CurrentQuestion] = index;
        setUserAnswers(newUserAnwers);
    }
    const [score, setscore] = useState(0);
    const [isQuizEnded, setisQuizEnded] = useState(false);
    const goNext = () => {
        if (CurrentQuestion === quizData.length - 1) {
            setisQuizEnded(true);
        } else {
            setCurrentQuestion((pre) => pre + 1);
        }

    }
    const goBack = () => {
        if (CurrentQuestion > 0) {

            setCurrentQuestion((pre) => pre - 1);
        }
    };

    const restart = () => {
        setCauTraLoi(0);
        setCurrentQuestion(0);
        setUserAnswers(Array.from({
            length: quizData.length
        }));
        setisQuizEnded(false);
        setscore(0);
    }
    useEffect(() => {
        const answer = Number(UserAnswers[CurrentQuestion])
        const pass = quizData[CurrentQuestion].options[answer]

        if (answer != undefined) {
            setCauTraLoi(pass);
        } else {
            setCauTraLoi("");
        }
    }, [CurrentQuestion, UserAnswers]);
    useEffect(() => {
        if (CauTraLoi === quizData[CurrentQuestion].answer) {
            setscore((prev) => prev + 1)
        }
    }, [CauTraLoi])

    if (isQuizEnded) {
        return <Result score={score} totalQuestion={quizData.length} restart={restart} />
    }

    return (
        <div>
            <h2>Cau {CurrentQuestion + 1}</h2>
            <p className="question">{quizData[CurrentQuestion].question}</p>

            {quizData[CurrentQuestion].options.map((option, index) => (
                <button
                    key={option}
                    className={`option ${CauTraLoi === option ? "selected" : ""}`}
                    disabled={!!CauTraLoi && CauTraLoi !== option}
                    onClick={() => LuaChon(option, index)}>
                    {option}</button>
            ))}



            {CauTraLoi ? (
                CauTraLoi === quizData[CurrentQuestion].answer ? (
                    <p className="correct-answer">Câu Trả Lời Của Bạn Chính Xác🥰</p>
                ) : (
                    <p className="incorrect-answer">Câu Trả Lời Của Bạn Chưa Chính Xác😵</p>

                )) : ("")
            }
            <div className="nav-buttons">
                <button onClick={goBack} disabled={CurrentQuestion === 0}>Quay Lại</button>
                <button onClick={goNext} disabled={!CauTraLoi}>{CurrentQuestion === quizData.length - 1 ? "Hoàn Thành" : "Kế Tiếp"}</button>
            </div>
        </div>

    )
}

export default Quiz
