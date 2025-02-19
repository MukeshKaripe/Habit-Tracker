import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../store/store";
import { deletItem, habbitsToggle, Habit } from "../../redux/reduxSlice";
import { Box, Button, Grid, Grid2, LinearProgress, Typography } from "@mui/material";
import { CheckCircleOutlineOutlined, CheckCircleRounded, CropSquareSharp, Delete, GridOnRounded, RemoveCircleOutline } from "@mui/icons-material";

const Slecteduse = () => {
    const { habits } = useSelector((state: Rootstate) => state.habbit)
    useEffect(() => {
        console.log(habits, 'ddat');

        return () => {

        };
    }, []);
    const dispatch = useDispatch<AppDispatch>()
    const today = new Date().toISOString().split("T")[0]
    const getStreak = (habs: Habit) => {
        let streak = 0;
        const dateKnw = new Date();
        while (true) {
            const curerentDate = dateKnw.toISOString().split("T")[0]
            if (habs.completedDates.includes(curerentDate)) {
                streak++;
                dateKnw.setDate(dateKnw.getDate() - 1)
            }
            else{
                break;
            }
        }
        return streak;

    }
    return (<>
        <Box sx={{display:"flex",flexWrap:'wrap',gap:'20px'}}>
            {habits.map((val: Habit) => {
                return (<>
                    <Box sx={{ margin: '10px 0px', padding: '10px', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)', width:'47%' }}>
                        <Grid container flexDirection={'row'} key={val.id} >
                            <Grid xs={12} md={6}>
                                {val.name}
                                <div>
                                    {val.frequency}
                                </div>

                            </Grid>
                            <Grid xs={12} md={6} container flexWrap={'nowrap'} >
                                <Button variant="contained" sx={{ marginRight: '10px', whiteSpace:'nowrap' }} color={val.completedDates.includes(today) ? "success" : "primary"} startIcon={<CheckCircleOutlineOutlined />} onClick={() => dispatch(habbitsToggle({ id: val.id, date: today }))}  >{val.completedDates.includes(today) ? "Completed" : "Mark Complete"}  </Button>
                                <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => dispatch(deletItem({ id: val.id }))} >Delete</Button>


                            </Grid>
                        </Grid>
                        <Typography variant="h6" >Current Steak: {getStreak(val)}</Typography>
                        <LinearProgress variant="determinate" value={getStreak(val)/30 * 100} ></LinearProgress>
                    </Box>
                </>)
            })}
        </Box>
    </>)
}
export default Slecteduse; 