import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addNew } from "../../redux/reduxSlice";

const AddHabbit = () => {
    const [name, setName] = useState<string>('');
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(addNew({ name, frequency }))
        }
        setName('')
    }
    return (<>
        <form action="habbits
" onSubmit={handleSubmit}>
            <TextField className="mb-2" sx={{ marginBottom: "10px" }} label="Enter Habit" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={frequency}
                    label="Age"
                    onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                >
                    <MenuItem value="daily">daily</MenuItem>
                    <MenuItem value="weekly">weekly</MenuItem>
                </Select>
            </FormControl>
            <Button fullWidth sx={{ marginTop: '10px' }} variant="contained" type='submit' >Add Habit</Button>
        </form>
    </>)
}
export default AddHabbit;
