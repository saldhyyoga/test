import React, { Component } from "react";

import "../styles/inputdata.css";

function TotalMoney(props) {
  return (
    <div className="totalMoney">
      <div className="description">
        Total Pemasukan
        <div className="rupiah">{props.pemasukan}</div>
      </div>
      <div className="description">
        Total Pengeluaran
        <div className="rupiah">{props.pengeluaran}</div>
      </div>
      <div className="description">
        Total Uang
        <div className="rupiah">{props.totalUang}</div>
      </div>
    </div>
  );
}

export default class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      judul: "",
      tipe: "",
      jumlah: 0,
      pengeluaran: 0,
      pemasukan: 0,
      totalUang: 0,
      items: {},
      itemLists: [],
      editing: false
    };
  }

  onChangeTipe = event => {
    this.setState({
      tipe: event.target.value
    });
  };

  onChangeJumlah = event => {
    this.setState({ jumlah: event.target.value });
  };

  onChangeJudul = event => {
    this.setState({ judul: event.target.value });
  };

  countMoney = event => {
    event.preventDefault();
    let items = {
      // id: this.state.itemLists.length + 1,
      tipe: this.state.tipe,
      jumlah: this.state.jumlah,
      judul: this.state.judul
    };

    this.setState(
      {
        jumlah: 0,
        judul: "",
        items: items,
        itemLists: [...this.state.itemLists, items]
      },
      () => {
        if (this.state.tipe === "pengeluaran") {
          this.setState({
            pengeluaran: this.state.pengeluaran + items.jumlah,
            totalUang: this.state.totalUang - items.jumlah
          });
        } else if (this.state.tipe === "pemasukan") {
          this.setState({
            pemasukan: this.state.pemasukan + items.jumlah,
            totalUang: this.state.totalUang + items.jumlah
          });
        }
      }
    );

    console.log(this.state.itemLists);

    // if (items.tipe === "pengeluaran") {
    //   this.setState({ pengeluaran: items.jumlah });
    // }
    // console.log(this.state.pengeluaran);

    // this.setState({ jumlah: "", tipe: "", judul: "" });

    // console.log(this.state.itemLists);
    // console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>REACT TABUNGAN APP (CRUD)</h1>

        <div className="formWrapper">
          <form onSubmit={this.countMoney}>
            <div className="form-group col-md-4">
              <label>Tipe</label>
              <select className="form-control" onChange={this.onChangeTipe}>
                <option>Pilih</option>
                <option value="pengeluaran">Pengeluaran</option>
                <option value="pemasukan">Pemasukan</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label for="inputState">Jumlah</label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={this.onChangeJumlah}
                value={this.state.jumlah}
              ></input>
            </div>

            <div className="form-group col-md-4">
              <label for="inputState">Judul</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={this.onChangeJudul}
                value={this.state.judul}
              ></input>
            </div>

            <button type="submit" className="btn btn-primary mb-2 submitButton">
              Submit
            </button>
          </form>
        </div>

        <TotalMoney
          pengeluaran={this.state.pengeluaran}
          pemasukan={this.state.pemasukan}
          totalUang={this.state.totalUang}
        />
      </div>
    );
  }
}
