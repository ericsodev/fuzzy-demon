import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    ButtonGroup,
    Center,
    Flex,
    Heading,
    Input,
    List,
    ListItem,
    useColorMode,
    VStack,
} from "@chakra-ui/react";
import AlgorithmButton from "./AlgorithmButton";
import cosineMatch from "./algorithms/cosineSimilarity";

function App() {
    const [input, setInput] = useState("");
    const [algo, setAlgo] = useState("cosine");
    const [matches, setMatches] = useState<string[]>([]);
    const { toggleColorMode } = useColorMode();
    const ref = useRef<string[]>([]);
    useEffect(() => {
        fetch("/10000.txt")
            .then((r) => r.text())
            .then((text) => {
                ref.current = text.split("\n");
            });
    }, []);

    useEffect(() => {
        if (!input) {
            setMatches([]);
            return;
        }
        switch (algo) {
            case "cosine":
                setMatches(cosineMatch(ref.current, input));
        }
    }, [algo, input]);

    let changeTimeout: any;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(changeTimeout);
        if (!e.target.value) setInput("");
        changeTimeout = setTimeout(() => {
            setInput(e.target.value);
        }, 200);
    };

    return (
        <Center h="full" bg={"gray.800"}>
            <Flex
                direction={"column"}
                alignItems="center"
                gap={12}
                h="full"
                justifyContent={"center"}
                padding="32"
            >
                <Heading flex={0} size={"3xl"} color={"red.200"}>
                    Fuzzy Demon
                </Heading>
                <VStack flex={0}>
                    <Input
                        variant={"filled"}
                        colorScheme={"green"}
                        width={"sm"}
                        onChange={handleChange}
                        placeholder="enter a word"
                    ></Input>
                    <ButtonGroup>
                        <AlgorithmButton
                            algoId={"cosine"}
                            algoName={"Cosine Similarity"}
                            setAlgo={setAlgo}
                            selectedAlgo={algo}
                        ></AlgorithmButton>
                        <AlgorithmButton
                            algoId={"soundex"}
                            algoName={"Soundex"}
                            setAlgo={setAlgo}
                            selectedAlgo={algo}
                        ></AlgorithmButton>
                        <AlgorithmButton
                            algoId={"metaphone"}
                            algoName={"Metaphone"}
                            setAlgo={setAlgo}
                            selectedAlgo={algo}
                        ></AlgorithmButton>
                    </ButtonGroup>
                </VStack>
                <VStack flex={1} flexBasis={"40%"}>
                    <Heading size={"lg"}>potential results</Heading>
                    <List>
                        {matches.map((v, i) => (
                            <ListItem
                                key={i}
                                fontSize={"lg"}
                                fontWeight={"semibold"}
                            >
                                {v}
                            </ListItem>
                        ))}
                    </List>
                </VStack>
            </Flex>
        </Center>
    );
}

export default App;
