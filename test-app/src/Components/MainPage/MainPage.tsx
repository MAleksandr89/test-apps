import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchTrain } from '../../Redux/Slices/trainSlice';
import { fetchDataTrain } from '../../Redux/Slices/trainSlice';
import { DetailCharacteristics } from '../DetailCharacteristics/DetailCharacteristics';
import { DataTrain } from '../../Redux/Slices/trainSlice';
import classes from './mainPage.module.scss';

export const MainPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [currentTrain, setCurrentTrain] = React.useState({});

    React.useEffect(() => {
        dispatch(fetchTrain());
    }, [dispatch]);

    const dataTrain = useSelector(fetchDataTrain);

    const handleSelectTrain = (item: DataTrain) => {
        setCurrentTrain(item);
    };

    const isEmpty = Object.keys(currentTrain).length === 0;

    return (
        <div className={classes.content}>
            <div className={classes['train-list']}>
                <div className={classes['content-title']}>Поезда</div>
                <div className={classes['content-descriptions']}>
                    <span>Название</span>
                    <span>Описание</span>
                </div>
                {dataTrain.map((item, index) => (
                    <div
                        className={classes['number-train']}
                        key={item.name}
                        onClick={() => handleSelectTrain(item)}
                    >
                        <div>{item.name}</div> <div>{item.description}</div>
                    </div>
                ))}
            </div>
            {!isEmpty && <DetailCharacteristics {...currentTrain} />}
        </div>
    );
};
