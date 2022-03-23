import React from 'react'
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const BackButton = ({ link }) => {
    return (
        <div className="mt-5 ">
            <Link to={link}>
                <Button
                    className="border rounded-extra"
                    variant="primary"
                    size="sm"
                >
                    <Icon.ArrowLeftCircleFill 
                        className="mb-1"
                        size="16"
                    />
                    <span className="text-500 mx-1">Назад</span>
                </Button>
            </Link>
        </div>
    )
}

export default BackButton