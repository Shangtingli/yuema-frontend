import * as React from "react";
import {TRAVELLERS_EACH_PAGE, TRAVELLERS_EACH_ROW} from "../../../Constants";
import {Pagination} from "antd";
import TravellerRow from "./TravellerRow"
import Filter from "./Filter"
import {filterTravellers} from "../../../Util"

export default class TravellerList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            currPage: 1,
        }
    }

    createTravellerRow = (data) => {
        return (
            <TravellerRow data={data[1]} key={data[0]}/>
        )
    }

    onChange = (e) => {
        this.setState({currPage: e});
    }

    render() {
        // const states = store.getState();
        const start = this.state.currPage;
        const travellerData = this.props.travellerData;

        const travellerPageData = travellerData.slice((start - 1) * TRAVELLERS_EACH_PAGE, start * TRAVELLERS_EACH_PAGE);
        const travellerRowDatas = [];
        var travellerRow = [];
        var count =0, rows = 0;
        for (let traveller of travellerPageData){
            travellerRow.push(traveller);
            count++;
            if (count === TRAVELLERS_EACH_ROW){
                travellerRowDatas.push([rows,travellerRow.slice()]);
                rows++;
                travellerRow = [];
            }
        }
        if (travellerRow.length >0){
            travellerRowDatas.push([rows,travellerRow]);
        }
        // const totalPage = storeData.length/STORES_EACH_PAGE + (storeData.length % STORES_EACH_PAGE === 0 ? 0: 1);


        return (
            <div style={{height: "100%", width: "100%",textAlgin:"center",margin:"auto"}}>

                <Filter
                    filterAge={this.props.handleFilterAge}
                    filterGender={this.props.handleFilterGender}
                    ageRange={this.props.ageRange}
                    gender={this.props.gender}
                />
                    {travellerRowDatas.map(this.createTravellerRow)}
                <Pagination defaultCurrent={this.state.currPage} total={travellerData.length} defaultPageSize={TRAVELLERS_EACH_PAGE} onChange={this.onChange} style={{display:'inline-block'}}/>
            </div>
        )


    }
}