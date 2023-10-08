import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';

import { useAccount, useDisconnect } from 'wagmi';



const Germinacion = () => {

    const [inase, setInase] = useState("");
    const [tipoSemilla, settipoSemilla] = useState("");
    const [fechaGerminacion, setFechaGerminacion] = useState("");

    const { address } = useAccount();
    console.log(address)

    const router = useRouter();

    const onSendGerminacion = () => {
        // Comprueba si los campos requeridos están vacíos
        if (!inase || !tipoSemilla || !fechaGerminacion) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        const data = {
            id: Number(Math.random().toString().slice(2, 13)),
            etapa: "germinacion",
            inase,
            tipoSemilla,
            fechaGerminacion
        }

        //LOCAL_STORAGE
        // Obtener los datos existentes del almacenamiento local
        const existingData = JSON.parse(localStorage.getItem('data')) || [];

        // Agregar los nuevos datos
        existingData.push(data);

        // Guardar los nuevos datos en el almacenamiento local
        localStorage.setItem('data', JSON.stringify(existingData));

        toast.success('Proceso creado');
        
        // setTimeout(() => {
        //     router.push('/home');
        // }, 3000);

    }

    return (
        <div className="flex-col mx-auto max-w-2xl mt-28">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <h1 className="flex justify-center mb-4">ETAPA GERMINACIÓN</h1>
            <Input
                className="mb-5"
                size={"sm"}
                type="text"
                label="Codigo INASE"
                isRequired
                onValueChange={setInase}
            />
            <Input
                className="mb-5"
                size={"sm"}
                type="semilla"
                label="Tipo de Semilla"
                isRequired
                onValueChange={settipoSemilla}
            />
            <Input
                className="mb-5"
                size={"md"}
                labelPlacement={"outside-left"}
                type="date"
                label="Fecha de Germinación"
                isRequired
                onValueChange={setFechaGerminacion}
            />
            <Button
                className="flex justify-center mx-auto"
                color="primary"
                onPress={onSendGerminacion}
            >
                Send
            </Button>

        </div>
    )
}

export default Germinacion