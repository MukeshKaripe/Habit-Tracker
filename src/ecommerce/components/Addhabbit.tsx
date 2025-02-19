// src/components/AddHabit.tsx
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addNew } from "../../redux/reduxSlice";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelected';

const AddHabit = () => {
    const [name, setName] = useState<string>('');
    const { t } = useTranslation();
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(addNew({ name, frequency }));
        }
        setName('');
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' , marginTop: '20px' }}>
                <Typography variant="h4">{t('common.welcome')}</Typography>
                <LanguageSelector />
            </Box>
            <Box 
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    margin:"auto"
                }}
            >
            <Typography variant="h5">Add Task</Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    className="m-4" 
                    sx={{ marginBottom: "20px", marginTop:"20px" }} 
                    label={t('habbit.enterHabit')} 
                    fullWidth 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <FormControl fullWidth>
                    <InputLabel>{t('habbit.frequency')}</InputLabel>
                    <Select
                        value={frequency}
                        label={t('habbit.frequency')}
                        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                    >
                        <MenuItem value="daily">{t('habbit.enterDaily')}</MenuItem>
                        <MenuItem value="weekly">{t('habbit.enterWeekly')}</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    fullWidth 
                    sx={{ marginTop: '10px' }} 
                    variant="contained" 
                    type='submit'
                >
                    {t('submit.submit')}
                </Button>
            </form>
            </Box>
        </>
    );
};

export default AddHabit;