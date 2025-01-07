import { Box, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../store/store";
import { fetchData, Habit } from "../../redux/reduxSlice";
import { useEffect } from "react";


const Habbitstats = () => {
    const { habits, isLoading, error } = useSelector((state: Rootstate) => state.habbit)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchData())
      }, []);
    if (isLoading) {
        return (<>
            <LinearProgress sx={{margin:"10px 0px"}} />
        </>)
    }
    if (error) {
        return (<>
        <Typography variant="body1">error: {error} </Typography>
        </>)
    }
    const getTodayData = () => {
        const today = new Date().toISOString().split("T")[0]
        return habits.filter((hab) => hab.completedDates.includes(today)).length
    }
    const getStreak = (habits: Habit) => {
        let steak = 0;
        const today = new Date()
        while (true) {
            const dateSet = today.toISOString().split("T")[0]
            if (habits.completedDates.includes(dateSet)) {
                steak++;
                today.setDate(today.getDate() - 1);
            }
            else {
                break;
            }
        } return steak;
    }
    const maxStreak = () => Math.max(...habits.map(getStreak),0)
   
    return (<>
        <Box sx={{ margin: '10px 0px', padding: '10px', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6"> Habbits Info</Typography>
            <Typography variant="body1"> Total : {habits.length}</Typography>
            <Typography variant="body2"> Total Habbits Today : {getTodayData()}</Typography>
            <Typography variant="body2"> Total Steak : {maxStreak()}</Typography>
        </Box>
    </>)
}
export default Habbitstats;