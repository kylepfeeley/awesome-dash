import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Avatar,
    AvatarBadge,
    Badge,
    Box,
    Flex,
    HStack,
    IconButton,
    Stack,
    Tooltip,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DISABLED_PROFILE_TEXT } from "../utils/constants";
import { useMe } from "../utils/hooks";
import LogoutButton from "./LogoutButton";
import NavLink from "./NavLink";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [loggedIn, setLoggedIn] = useState(false);

    const { me } = useMe();

    useEffect(() => {
        if (me) {
            // we check if the query useMe() return an empty object
            const isEmpty: boolean = Object.keys(me).length == 0;
            isEmpty ? setLoggedIn(false) : setLoggedIn(true)
        }
    }, [me])

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack spacing={8} alignItems={"center"}>
                        <NavLink mr={4} to="/">
                            Home
                        </NavLink>
                        <Tooltip
                            isDisabled={loggedIn}
                            hasArrow
                            label={DISABLED_PROFILE_TEXT}
                            bg={"red.600"}
                        >
                            <HStack
                                as={"nav"}
                                spacing={4}
                                display={{ base: "none", md: "flex" }}
                            >
                                <div className={loggedIn ? "" : "link-disabled"}>
                                    <NavLink mr={4} to="/profile">
                                        Profile
                                    </NavLink>
                                </div>
                            </HStack>
                        </Tooltip>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            {!loggedIn ? (
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Box>
                                        <Badge variant="outline" colorScheme={"red"}>
                                            Not logged in
                                        </Badge>
                                    </Box>
                                </Stack>
                            ) : (
                                <LogoutButton />
                            )}
                            <IconButton
                                variant={"ghost"}
                                size={"md"}
                                onClick={toggleColorMode}
                                aria-label="toggle theme"
                                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            />
                            <HStack direction={"row"}>
                                <Tooltip
                                    isDisabled={!loggedIn}
                                    hasArrow
                                    label={"user email"}
                                    bg={"green.600"}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={
                                            loggedIn
                                                ? "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                                : ""
                                        }
                                    >
                                        <AvatarBadge boxSize={'1.25em'} bg={loggedIn ? 'green.500' : 'tomato'}></AvatarBadge>
                                    </Avatar>
                                </Tooltip>
                            </HStack>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Navbar;
