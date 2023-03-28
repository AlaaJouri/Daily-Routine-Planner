import "./UserData.css";
import useAuth from "../hooks/useAuth";

export default function ProfileUserData() {

    const {user} = useAuth(false)
    if (!user) return <p> User not fund</p>


    return (
        <div className="Profile">
            <div>
                <h1 id="title">Profile</h1>
                <p id="description">Planen Sie Ihren Tag</p>
                <hr/>
            </div>
            <form id="survey-form" className="container">
                <div className="item0">
                    <label htmlFor="name">Name</label>
                    <br/>
                    <input value={user.name}/>
                    <br/>
                </div>
                <div className="item1">
                    <label htmlFor="Geschlecht">Geschlecht</label>
                    <br/>
                    <input value={user.gender}/>

                    <br/>
                </div>
                <div className="item2">
                    <label htmlFor="Gewicht">Gewicht</label>
                    <br/>
                    <input value={user.weight}/>

                    <br/>
                </div>
                <div className="item3">
                    <label htmlFor="Zielgewicht">Zielgewicht</label>
                    <br/>
                    <input value={user.weightGoal}/>


                    <br/>
                </div>
                <div className="item4">
                    <label htmlFor="Schlafzeitziel">Schlafzeitziel</label>
                    <br/>
                    <input value={user.sleepTimeTarget}/>

                    <br/>
                </div>
                <div className="item5">
                    <label htmlFor="TrainingszeitZiel">Trainingszeit Ziel</label>
                    <br/>
                    <input value={user.trainingTimeGoal}/>

                    <br/>
                </div>
                <div className="item6">
                    <label htmlFor="SchrittZiel">SchrittZiel</label>
                    <br/>
                    <input value={user.stepTarget}/>

                    <br/>
                </div>
                <div className="item7">
                    <label htmlFor="KalorienverbrauchZiel">KalorienverbrauchZiel</label>
                    <br/>
                    <input value={user.caloriesBurnedTarget}
                           placeholder={"caloriesBurnedTarget"}/>

                    <br/>
                </div>
                <button className="item8">Speichern</button>

            </form>
        </div>
    );
}
