import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    // initialize our state
    state = {
        data: [],
        intervalIsSet: false,
        // create
        name: null,
        email: null,
        // update
        oldEmailToUpdate: null,
        nameToUpdate: null,
        emailToUpdate: null,
        // delete
        emailToDelete: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        fetch("/api/customer")
            .then(data => data.json())
            .then(res => this.setState({ data: res.data }));
    };

    // our POST method that uses our backend api
    // to create new query into our data base
    postDataToDB = (name, email) => {
        axios.post("/api/customer", {
            name: name,
            email: email,
        });
    };


    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = emailToDelete => {
        let objEmailToDelete = null;
        this.state.data.forEach(dat => {
            if (dat.email === emailToDelete) {
                objEmailToDelete = dat.email;
            }
        });
        axios.delete("/api/customer", {
            data: {
                email: objEmailToDelete
            }
        });
    };


    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (oldEmailToUpdate, nameToUpdate, emailToUpdate ) => {
        let objEmailToUpdate = null;
        this.state.data.forEach(dat => {
            if (dat.email === oldEmailToUpdate) {
                objEmailToUpdate = dat.email;
            }
        });

        axios.put("/api/customer", {
            oldEmail: objEmailToUpdate,
            name: nameToUpdate,
            email: emailToUpdate,
        });
    };


    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { data } = this.state;
        return (
            <div>
                <h1 style={{ textAlign: "center" }} >My first MERN App</h1>
                <ul>
                    {data.length <= 0
                        ? "NO DB ENTRIES YET"
                        : data.map(dat => (
                            <li style={{ padding: "10px" }} key={dat._id}>
                               {/* <span style={{ color: "gray" }}> id: </span> {dat._id} <br />*/}
                                <span style={{ color: "blue" }}> Nom : </span>
                                {dat.name}
                                <span style={{ color: "blue" }}> Email : </span>
                                {dat.email}
                            </li>
                        ))}
                </ul>
                <div style={{ padding: "10px" }}>
                    <h3>Ajouter un participant</h3>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        placeholder="name"
                        style={{ width: "200px" }}
                    />
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="email"
                        style={{ width: "200px" }}
                    />
                    <button onClick={() => {
                        this.postDataToDB(this.state.name, this.state.email)
                        this.setState({
                            email: '',
                            name: '',
                        })
                    }}>
                        Add
                    </button>
                </div>

                <div style={{ padding: "10px" }}>
                    <h3>Modifier un participant</h3>
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        value={this.state.oldEmailToUpdate}
                        onChange={e => this.setState({ oldEmailToUpdate: e.target.value })}
                        placeholder="old email"
                    />
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        value={this.state.nameToUpdate}
                        onChange={e => this.setState({ nameToUpdate: e.target.value })}
                        placeholder="new name"
                    />
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        value={this.state.emailToUpdate}
                        onChange={e => this.setState({ emailToUpdate: e.target.value })}
                        placeholder="new email"
                    />
                    <button
                        onClick={() => {
                            this.updateDB(this.state.oldEmailToUpdate, this.state.nameToUpdate, this.state.emailToUpdate);
                            this.setState({
                                    oldEmailToUpdate: '',
                                    nameToUpdate: '',
                                    emailToUpdate: '',
                                })
                            }}
                    >
                        Update
                    </button>
                </div>

                <div style={{ padding: "10px" }}>
                    <h3>Supprimer un participant</h3>
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        value={this.state.emailToDelete}
                        onChange={e => this.setState({ emailToDelete: e.target.value })}
                        placeholder="email to delete"
                    />
                    <button onClick={() => {
                        this.deleteFromDB(this.state.emailToDelete);
                        this.setState({emailToDelete: ''})
                        }
                    }>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
