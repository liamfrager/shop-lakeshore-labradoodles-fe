import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


interface Paw {
    left: number;
    top: number;
    rotation: number;
    speed: number;
    size: number;
    color: string
}

export default function PawPrints() {
    const pawsRef = useRef<HTMLDivElement | null>(null);
    const [paws, setPaws] = useState<Array<Paw>>([]);
    const [bluePawFound, setBluePawFound] = useState<boolean>(false);
    const randomBrightColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;


    const newPaw = useCallback((): Paw => {
        const randomBrandColor = () => {
            const x = Math.random() * 100;
            if (x > 99) {
                return 'var(--blue)';
            } else if (x > 80) {
                return 'var(--light-brown)';
            } else if (x > 60) {
                return 'var(--brown)';
            } else if (x > 40) {
                return 'var(--white)';
            } else {
                return 'var(--tan)';
            }
        }
        return {
            left: 10 + (Math.random() * (window.innerWidth - 20)),
            top: -50, // Start above the screen
            rotation: Math.floor(Math.random() * 360),
            speed: Math.random() * 1 + 0.5,
            size: 4 + Math.floor(Math.random() * 2),
            color: randomBrandColor(),
        };
    }, []);

    useEffect(() => {
        if (bluePawFound) {
            const rainbowFlash = () => {
                setPaws((prevPaws) =>
                    prevPaws.map(paw => {
                        return {
                            ...paw,
                            color: randomBrightColor(),
                        }
                    })
                );
            }
            rainbowFlash();
            const intervalId = setInterval(rainbowFlash, 1000);
            return () => clearInterval(intervalId);
        }
    }, [bluePawFound])

    useEffect(() => {
        const generatePaw = () => {
            setPaws((prevPaws) => [...prevPaws, newPaw()]);
        };

        const pawCount = Math.floor(window.innerWidth * window.innerHeight / 50000);

        for (let i = 0; i < pawCount; i++) {
            setTimeout(generatePaw, i * window.innerHeight * 1.5);
        }

        return () => setPaws([]);
    }, [newPaw]);

    useEffect(() => {
        const animatePaws = () => {
            setPaws((prevPaws) =>
                prevPaws.map(paw => {
                    if (paw.top < window.innerHeight) {
                        return {
                            ...paw,
                            top: paw.top + paw.speed,
                        };
                    }
                    return newPaw();
                })
            );
        };

        const interval = setInterval(animatePaws, 16); // ~60fps
        return () => clearInterval(interval);
    }, [paws, newPaw]);

    const handlePawClick = (color: string) => {
        if (color === 'var(--blue)') {
            setBluePawFound(true);
        }
    }

    return (
        <div
            ref={pawsRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
            }}
        >
            {paws.map((paw, index) => (
                <FontAwesomeIcon
                    key={index}
                    icon={faPaw}
                    style={{
                        position: 'absolute',
                        left: `${paw.left - paw.size / 2}px`,
                        top: `${paw.top - paw.size / 2}px`,
                        transform: `rotate(${paw.rotation}deg)`,
                        fontSize: `${paw.size}em`,
                        opacity: 0.5,
                        color: paw.color,
                        cursor: paw.color === 'var(--blue)' ? 'pointer' : 'default',
                        pointerEvents: paw.color === 'var(--blue)' ? 'auto' : 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                    }}
                    onClick={() => handlePawClick(paw.color)}
                />
            ))}
        </div>
    );
}