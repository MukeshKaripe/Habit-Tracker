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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4">{t('common.welcome')}</Typography>
                <LanguageSelector />
            </Box>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    className="mb-2" 
                    sx={{ marginBottom: "10px" }} 
                    label={t('common.enterHabit')} 
                    fullWidth 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                
                <FormControl fullWidth>
                    <InputLabel>{t('common.frequency')}</InputLabel>
                    <Select
                        value={frequency}
                        label={t('common.frequency')}
                        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                    >
                        <MenuItem value="daily">{t('common.daily')}</MenuItem>
                        <MenuItem value="weekly">{t('common.weekly')}</MenuItem>
                    </Select>
                </FormControl>
                
                <Button 
                    fullWidth 
                    sx={{ marginTop: '10px' }} 
                    variant="contained" 
                    type='submit'
                >
                    {t('common.submit')}
                </Button>
            </form>
        </>
    );
};

export default AddHabit;