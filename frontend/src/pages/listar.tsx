import { useEffect, useState, useCallback } from "react";


import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { SearchInput } from '../components/SearchInput';

import {
    Button,
    Chip,
    ChipProps,
    Pagination,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
    true: "success",
    false: "danger",
    vacation: "warning",
};

const Listar = () => {

    const [semillas, setSemillas] = useState([])

    useEffect(() => {
        const data = localStorage.getItem('data');
        setSemillas(data ? JSON.parse(data) : []);
    }, []);

    const columns = [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "inase",
            label: "INASE",
        },
        {
            key: "etapa",
            label: "ETAPA"
        },
        {
            key: "tipoSemilla",
            label: "TIPO DE SEMILLA",
        },
        {
            key: "fechaGerminacion",
            label: "FECHA DE GERMINACION"
        },
        {
            key: "actions",
            label: "ACTIONS"
        }
    ];

    const renderCell = useCallback((seed: any, columnKey: React.Key) => {
        const cellValue = seed[columnKey as keyof Seed];

        switch (columnKey) {
            case "id":
                return (
                    <p className="text-bold text-sm capitalize text-default-400">{seed.id}</p>
                );
            case "inase":
                return (
                    <p>{cellValue}</p>
                );
            case "etapa":
                return (
                    <p>{cellValue}</p>
                );
            case "tipoSemilla":
                return (
                    <p>{cellValue}</p>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Ver Detalle" color="primary"
                        >
                            <span
                                // onClick={() => onPaciente(user.uid)}
                                className="text-lg text-primary text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Agregar info">
                            <span className="text-lg text-success text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    return (
        <div className="flex justify-center mt-20">

            <div className="max-w-4xl min-w-[50%] text-left grid grid-cols-1 justify-items-center mb-7" 	>
                <SearchInput />
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns} >
                        {(column) => <TableColumn key={column.key} align='center'>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody emptyContent={"No se encontraron semillas."} items={semillas}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default Listar;