import Porta from '@/components/Porta';
import PortaModel from "../../../model/porta";
import { useEffect, useState } from 'react';
import { atualizarPortas, criarPortas } from '@/functions/portas';
import styles from "@/styles/Jogo.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function jogo() {
    const router = useRouter()
    const [portas, setPortas] = useState<PortaModel[]>([])

    useEffect(() => {
        const portas = Number(router.query.portas)
        const temPresente = Number(router.query.temPresente)
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])

    function renderizarPortas() {
        return portas.map((porta: PortaModel) => {
            return <Porta key={porta.numero} value={porta} onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
        })
    }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {renderizarPortas()}
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    );
}