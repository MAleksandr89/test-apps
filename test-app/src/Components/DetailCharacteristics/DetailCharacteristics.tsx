import React, { useState } from 'react';
import classNames from 'classnames';
import { Characteristics } from '../../Redux/Slices/trainSlice';
import classes from './DetailCharacteristics.module.scss';

interface DetailCharacteristicsProps {
    name?: string;
    characteristics?: Characteristics[];
}

export const DetailCharacteristics: React.FC<DetailCharacteristicsProps> = ({
    name,
    characteristics,
}) => {
    const [editableCharacteristics, setEditableCharacteristics] = useState<
        Characteristics[]
    >([]);

    React.useEffect(() => {
        setEditableCharacteristics(characteristics || []);
    }, [characteristics]);

    const handleChangeValue = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: keyof Characteristics
    ) => {
        const newValue = e.target.value;
        setEditableCharacteristics((prevState) => {
            const updatedCharacteristics = prevState.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        [field]: newValue,
                    };
                }
                return item;
            });
            return updatedCharacteristics;
        });
    };

    interface ValidatedCharacteristic {
        engineAmperage: {
            value: number;
            isValid: boolean;
        };
        force: {
            value: number;
            isValid: boolean;
        };
        speed: {
            value: number;
            isValid: boolean;
        };
    }

    const validateValues = (
        values: Characteristics[]
    ): ValidatedCharacteristic[] => {
        return values.map(({ speed, force, engineAmperage }) => {
            const speedValue = Number(speed);
            const forceValue = Number(force);
            const engineAmperageValue = Number(engineAmperage);

            const isValidSpeed =
                Number.isInteger(speedValue) && speedValue >= 0;
            const isValidForce =
                typeof forceValue === 'number' && forceValue > 0;
            const isValidEngineAmperage =
                Number.isInteger(engineAmperageValue) &&
                engineAmperageValue > 0;

            return {
                speed: {
                    value: speedValue,
                    isValid: isValidSpeed,
                },
                force: {
                    value: forceValue,
                    isValid: isValidForce,
                },
                engineAmperage: {
                    value: engineAmperageValue,
                    isValid: isValidEngineAmperage,
                },
            };
        });
    };
    const isValidResult = validateValues(editableCharacteristics);
    const isValidSpeed = isValidResult
        .map((speed) => speed.speed.isValid)
        .every(Boolean);
    const isValidForce = isValidResult
        .map((force) => force.force.isValid)
        .every(Boolean);
    const isValidEngineAmperage = isValidResult
        .map((engineAmperage) => engineAmperage.engineAmperage.isValid)
        .every(Boolean);

    const isValidAll = isValidSpeed && isValidForce && isValidEngineAmperage;

    const onSubmitForm = () => {
        if (!isValidAll) {
            return;
        }
        const sortSpeed = isValidResult
            .map((item) => item.speed.value)
            .sort((a, b) => b - a);
        console.log('Форма заполнена и валидна', sortSpeed);
    };

    return (
        <div className={classes.content}>
            <div className={classes['characteristics-table']}>
                <div className={classes['characteristics-title']}>
                    <div>Характеристики</div>
                    <div>{name}</div>
                </div>
                <table>
                    <thead className={classes['characteristics-description']}>
                        <tr>
                            <th>Ток двигателя</th>
                            <th>Сила тяги</th>
                            <th>Скорость</th>
                        </tr>
                    </thead>
                    <tbody className={classes['characteristics-count']}>
                        {editableCharacteristics.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        style={{
                                            color: isValidResult[index]
                                                .engineAmperage.isValid
                                                ? 'black'
                                                : 'red',
                                        }}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                e,
                                                index,
                                                'engineAmperage'
                                            )
                                        }
                                        type="input"
                                        value={item.engineAmperage}
                                    />
                                </td>
                                <td>
                                    <input
                                        style={{
                                            color: isValidResult[index].force
                                                .isValid
                                                ? 'black'
                                                : 'red',
                                        }}
                                        onChange={(e) =>
                                            handleChangeValue(e, index, 'force')
                                        }
                                        type="input"
                                        value={item.force}
                                    />
                                </td>
                                <td>
                                    <input
                                        style={{
                                            color: isValidResult[index].speed
                                                .isValid
                                                ? 'black'
                                                : 'red',
                                        }}
                                        onChange={(e) =>
                                            handleChangeValue(e, index, 'speed')
                                        }
                                        type="input"
                                        value={item.speed}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={onSubmitForm}
                className={classNames(classes['submit-button'], !isValidAll && classes.disabled)}
                type="button"
                disabled={!isValidAll}
            >
                Отправить данные
            </button>
        </div>
    );
};
